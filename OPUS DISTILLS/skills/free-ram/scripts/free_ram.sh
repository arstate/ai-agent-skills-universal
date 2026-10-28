#!/usr/bin/env bash
set -e

echo "=== SEBELUM PEMBERSIHAN ==="
free -h
if command -v zramctl >/dev/null 2>&1; then
    zramctl 2>/dev/null || true
fi
echo ""

echo "Menjalankan pembersihan cache & kompaksi memori..."
sync

# Drop caches
if [ -w /proc/sys/vm/drop_caches ]; then
    echo 3 > /proc/sys/vm/drop_caches
else
    echo "1509" | sudo -S sh -c "echo 3 > /proc/sys/vm/drop_caches" 2>/dev/null || sudo sh -c "echo 3 > /proc/sys/vm/drop_caches"
fi

# Compact RAM
if [ -w /proc/sys/vm/compact_memory ]; then
    echo 1 > /proc/sys/vm/compact_memory 2>/dev/null || true
else
    echo "1509" | sudo -S sh -c "echo 1 > /proc/sys/vm/compact_memory" 2>/dev/null || true
fi

# Compact ZRAM
if [ -f /sys/block/zram0/compact ]; then
    if [ -w /sys/block/zram0/compact ]; then
        echo 1 > /sys/block/zram0/compact 2>/dev/null || true
    else
        echo "1509" | sudo -S sh -c "echo 1 > /sys/block/zram0/compact" 2>/dev/null || true
    fi
fi

echo ""
echo "=== SETELAH PEMBERSIHAN ==="
free -h
if command -v zramctl >/dev/null 2>&1; then
    zramctl 2>/dev/null || true
fi
echo ""

echo "=== TOP 5 KONSUMEN RAM ==="
ps -eo pid,cmd,%mem --sort=-%mem | head -n 6
