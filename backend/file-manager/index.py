"""
Бэкенд для управления файлом утилиты MajesticGuard.
Поддерживает загрузку файла (admin) и получение ссылки для скачивания (public).
"""

import json
import os
import base64
import boto3
from botocore.exceptions import ClientError

BUCKET = "files"
FILE_KEY = "majesticguard/MajesticGuard.exe"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "majestic-admin-secret")

def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Admin-Token",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")

    # GET — получить мета-информацию о файле
    if method == "GET":
        s3 = get_s3()
        try:
            obj = s3.head_object(Bucket=BUCKET, Key=FILE_KEY)
            access_key = os.environ["AWS_ACCESS_KEY_ID"]
            cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{FILE_KEY}"
            return {
                "statusCode": 200,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({
                    "available": True,
                    "filename": FILE_KEY.split("/")[-1],
                    "size": obj.get("ContentLength", 0),
                    "last_modified": str(obj.get("LastModified", "")),
                    "download_url": cdn_url,
                }),
            }
        except ClientError:
            return {
                "statusCode": 200,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"available": False, "filename": None, "download_url": None}),
            }

    # POST / — загрузить файл (только для администратора)
    if method == "POST":
        headers = event.get("headers", {}) or {}
        token = headers.get("X-Admin-Token", "") or headers.get("x-admin-token", "")
        if token != ADMIN_TOKEN:
            return {
                "statusCode": 403,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Доступ запрещён"}),
            }

        body = json.loads(event.get("body") or "{}")
        file_data_b64 = body.get("file_data", "")
        filename = body.get("filename", "MajesticGuard.exe")

        if not file_data_b64:
            return {
                "statusCode": 400,
                "headers": {**cors_headers, "Content-Type": "application/json"},
                "body": json.dumps({"error": "Файл не передан"}),
            }

        file_bytes = base64.b64decode(file_data_b64)
        key = f"majesticguard/{filename}"

        s3 = get_s3()
        s3.put_object(
            Bucket=BUCKET,
            Key=key,
            Body=file_bytes,
            ContentType="application/octet-stream",
        )

        access_key = os.environ["AWS_ACCESS_KEY_ID"]
        cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"

        return {
            "statusCode": 200,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({
                "success": True,
                "filename": filename,
                "download_url": cdn_url,
                "size": len(file_bytes),
            }),
        }

    return {
        "statusCode": 404,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"error": "Not found"}),
    }