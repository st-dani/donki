while ($true) {
    $date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git add .
    git commit -m "Auto-commit: $date"
    Write-Host "Changes auto-committed at $date"
    Start-Sleep -Seconds 600  # 10분(600초) 대기
} 