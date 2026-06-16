const API_BASE = 'https://boneplate-mock-production.up.railway.app';

async function seed() {
    // 動態 import ES module
    const { MOCK_KITS } = await import('../web-frontend/src/page/bonePlate/mockData.js');

    console.log('🔄 清除現有資料...');
    const existing = await fetch(`${API_BASE}/kits`).then(r => r.json());
    await Promise.all(existing.map(k =>
        fetch(`${API_BASE}/kits/${k.id}`, { method: 'DELETE' })
    ));
    console.log(`   已刪除 ${existing.length} 筆`);

    console.log('📦 寫入 mock 資料...');
    await Promise.all(MOCK_KITS.map(kit =>
        fetch(`${API_BASE}/kits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(kit),
        })
    ));
    console.log(`   已寫入 ${MOCK_KITS.length} 筆器械盒`);
    console.log('✅ 初始化完成');
}

seed().catch(err => {
    console.error('❌ 初始化失敗:', err.message);
    process.exit(1);
});
