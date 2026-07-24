// ===================== LOADER DATA KEGIATAN =====================
// Sumber data: tabel "kegiatan" di Supabase (online, bisa diisi lewat admin.html).
// Kalau Supabase belum dikonfigurasi (lihat supabase-config.js), pakai data lokal
// dari galeri-data.js supaya situs tetap jalan.

function mapRowToGaleriItem(row, index) {
  const gClasses = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'];
  return {
    id: row.id,
    gClass: gClasses[index % gClasses.length],
    tag: row.tag,
    cat: row.cat,
    title: row.title,
    date: row.date_text,
    image: row.image_url,
    excerpt: row.excerpt || '',
    body: (row.body || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
  };
}

async function loadGaleriData() {
  const client = (typeof getSupabaseClient === 'function') ? getSupabaseClient() : null;
  if (!client) {
    return (typeof GALERI_DATA !== 'undefined') ? GALERI_DATA : [];
  }
  try {
    const { data, error } = await client
      .from('kegiatan')
      .select('*')
      .order('created_at', { ascending: false });
    if (error || !data) {
      console.warn('Gagal ambil data dari Supabase, pakai data lokal.', error);
      return (typeof GALERI_DATA !== 'undefined') ? GALERI_DATA : [];
    }
    return data.map(mapRowToGaleriItem);
  } catch (e) {
    console.warn('Gagal konek ke Supabase, pakai data lokal.', e);
    return (typeof GALERI_DATA !== 'undefined') ? GALERI_DATA : [];
  }
}

async function loadGaleriItemById(id) {
  const client = (typeof getSupabaseClient === 'function') ? getSupabaseClient() : null;
  if (!client) {
    const local = (typeof GALERI_DATA !== 'undefined') ? GALERI_DATA : [];
    return local.find(g => String(g.id) === String(id)) || null;
  }
  try {
    const { data, error } = await client.from('kegiatan').select('*').eq('id', id).single();
    if (error || !data) return null;
    return mapRowToGaleriItem(data, 0);
  } catch (e) {
    return null;
  }
}
