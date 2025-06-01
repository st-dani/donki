# 현재 날짜와 시간을 포함한 커밋 메시지 생성
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$message = "Auto commit: $date"

# 변경된 파일 스테이징
git add .

# 커밋 실행
git commit -m $message

Write-Host "Changes committed with message: $message"

while ($true) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git add .
    git commit -m "Auto-commit: $date"
    Write-Host "Changes auto-committed at $date"
    Start-Sleep -Seconds 600  # 10분(600초) 대기
} 