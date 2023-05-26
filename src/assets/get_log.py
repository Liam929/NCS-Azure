import requests
import json
import csv
import io

# 设置 API 请求的 URL 和请求头
url = 'https://api.loganalytics.io/v1/workspaces/39743c52-8e86-43b1-987e-cc5d848ecce7/query?timespan=PT30M'
headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJjYTdmM2YwYi03ZDkxLTQ4MmMtOGUwOS1jNWQ4NDBkMGVhYzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgvIiwiaWF0IjoxNjgyOTM2MDkxLCJuYmYiOjE2ODI5MzYwOTEsImV4cCI6MTY4Mjk0MTM5OSwiYWNyIjoiMSIsImFpbyI6IkFZUUFlLzhUQUFBQWdWVkFaQjRCOW1GaTVhVmRyd0tIL2VDTEVYb0EwclJoc2dZMXJ2QjhjRnB5UDh1bHJIdzFZMkZzbEM2MmVqdlJCdVRUWG4rOHdNMzNmaS80YWxJYW5vZitMUjFhQkpzR25kUjc3WUNOMUxQTldnOGo1NlZlNU9iSXByb3B1UElabzNMcVMvazFWUkIyeENhWjJMdnJUUkJwWjVqcXBLaldMRFhrM041YmpBND0iLCJhbHRzZWNpZCI6IjE6bGl2ZS5jb206MDAwNjdGRkUyMzFBNkQ1QSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI2ZTAwYjMxZi0wNmQ0LTRjOTMtOGIxNC1lMDhiNTY4YjRhMDQiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6Ilh1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoi5b6QIiwiZ2l2ZW5fbmFtZSI6Iui-sOa0iyIsImlkcCI6ImxpdmUuY29tIiwiaXBhZGRyIjoiMTE2Ljg4LjE5Ni4xNzIiLCJuYW1lIjoiWHVjaGVueWFuZzA2Iiwib2lkIjoiNjc0Y2I5MzAtMjMwOC00ZWJkLThjMDktNDljN2RjMzA1N2YyIiwicHVpZCI6IjEwMDMyMDAyNjVBNDIxNUMiLCJyaCI6IjAuQVVvQUpBb0VGWnJhcjAtRzZZcm9VcUxtLUFzX2Y4cVJmU3hJamduRjJFRFE2c1dKQU1ZLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6Ikw5Y3lkTFpyMVJvSW9YcVBvTmViSDlOOHFtQXMzbnlfMVp0OTJPbFdSemsiLCJ0aWQiOiIxNTA0MGEyNC1kYTlhLTRmYWYtODZlOS04YWU4NTJhMmU2ZjgiLCJ1bmlxdWVfbmFtZSI6ImxpdmUuY29tI1h1Y2hlbnlhbmcwNkBob3RtYWlsLmNvbSIsInV0aSI6IkM1NmN0LXlYZTBXeTlHVWJ3WDltQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjEzYmQxYzcyLTZmNGEtNGRjZi05ODVmLTE4ZDNiODBmMjA4YSJdfQ.FUeGZ34CYcEhXuZQL9OY63wMVyIHjVwC1mBLO3bUfeDx2rMTenhF5E0UQS1XBo0Poy8W8SrEnckQlc6bZKEL1yOC_HyzOmtPJTk6gEF9P1eySktKd-Td5pCWbC2oGRvxzRWvaX2Ctw-WPIr5C9zE6bh8aqN2zk3irxe8NDfbLNf9ZjuMpExYErLb3MVoBu5oSKlLGOBsXUidWcF0GOBBigCtFWgYg4xqHoL3HCzGVciLUZ2pUN6MgZn9iWGQeKhiLRdW9b8lv_S1UOjVzuoRw5zKSbeVPMH5jsSgeD3e4FGQU596qV0torPUJep2DDxcqP_da0H6BLuLVJD6pS2Tlw'
}

# 设置 API 请求的正文（查询字符串）
query = 'Event | where Source == "Microsoft-Windows-Sysmon"'

# 发送 HTTP POST 请求
response = requests.post(url, headers=headers, json={'query': query})

# 检查响应状态码
if response.status_code == 200:
    # 响应正常，输出响应内容
    # print(response.json())
    with open('response.json', 'w') as f:
        json.dump(response.json(), f)
    # 响应正常，将JSON格式的数据转换为CSV格式的数据
    # 获取表格数据
    data = response.json()['tables'][0]['rows']
    
    # 获取表头名称
    headers = [col['name'] for col in response.json()['tables'][0]['columns']]

    # 将数据写入 CSV 文件
    with io.open('response.csv', 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(data)
    # data = response.json()['tables'][0]['rows']
    # with open('response.csv', 'w', newline='', encoding='utf-8') as f:
    #     writer = csv.writer(f)
    #     # 写入表头
    #     writer.writerow(response.json()['tables'][0]['columns'])
    #     print(response.json()['tables'][0]['columns'])
    #     # 写入数据
    #     writer.writerows(data)
else:
    # 响应出错，输出错误信息
    print('Error: ' + response.text)