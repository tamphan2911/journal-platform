INSERT INTO "User" (
  "id", "email", "passwordHash", "firstName", "lastName", "name", "role",
  "organization", "affiliation", "profession", "isActive", "emailVerifiedAt",
  "termsAcceptedAt", "createdAt", "updatedAt"
) VALUES
  (
    'demo_admin', 'admin@chuyensan.vn',
    'scrypt:d82541e22445cba6dc241d5d195b7988:1ff55ecc45a2a0dda354f6ff78b80fc5e6ecf8f9b2f6d830165aa31ba417478db2c29b1f37f16341f30a21ca72a3bba44f33dbda563987d7d8eb7030da5a911d',
    'System', 'Admin', 'System Admin', 'ADMIN',
    'Chuyên san Khoa học Kinh tế - Luật', 'Quản trị hệ thống', 'Administrator',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'demo_editor', 'editor@chuyensan.vn',
    'scrypt:86e8272b582115da01e2c3e168d10d45:2c4ce5c0a9ca3bb922066c26cd24daee1ffc57e965968a02dba40a64abf29c82afc0573e3c65750f692a019f0f550dcb662886c55998490a152feda63b79bb8a',
    'Hoài', 'Nam', 'Hoài Nam', 'SECTION_EDITOR',
    'Trường Đại học Kinh tế - Luật', 'Ban biên tập chuyên mục', 'Lecturer',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'demo_chief_editor', 'chief.editor@chuyensan.vn',
    'scrypt:8800a0c797104ae7ae22e3ad294626f5:0f29d6b5f4c71ac72c1fd55767bfb8a94edde8c6323a4f0f16b98c3ffd73c34fbd575a785328e70ddaf40d18b0df3222ce3eacd50f8d52dd922ffa667b2db9df',
    'Minh', 'Khang', 'Minh Khang', 'EDITOR_IN_CHIEF',
    'Trường Đại học Kinh tế - Luật', 'Hội đồng biên tập', 'Lecturer',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'demo_author', 'author@example.edu.vn',
    'scrypt:67a0a7ee8ebfbb5e896b1fd07eff8712:9024e10949c698cd7467f53615cc10bd5b7640a4bb813f5ebd1cca6f1573f51ca09bcb24e6a3a26d5919c4cf76c353699f7da36f405a434fb134599c382a15bb',
    'Minh', 'Anh', 'Minh Anh', 'AUTHOR',
    'Trường Đại học Khoa học', 'Khoa Chính sách công', 'Researcher',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'demo_reviewer', 'reviewer@chuyensan.vn',
    'scrypt:92535e0da568da1a1027b85dbddea3ee:970ffc1c037e700bdedc62e83f48ff3236d82c0039ad4cf7c77f48385d0407b9b5844d98eff312a4403686a456cea1ae141a966e6d56d96912d44b8d719a30a3',
    'Bảo', 'Châu', 'Bảo Châu', 'REVIEWER',
    'Viện Nghiên cứu Dữ liệu', 'Nhóm Kinh tế số', 'Researcher',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    'demo_user', 'user@example.edu.vn',
    'scrypt:47f45af2528702103ca9a283a4a7c972:c766c4073a99030e03d85a213724ba3ca4983479242f73636c4df8302588abbc7255b8127bbc223efeeaeb2dfd437eb40ec04df25f3373cae3b4b52a534ecc48',
    'Thanh', 'Bình', 'Thanh Bình', 'USER',
    'Trường Đại học Kinh tế - Luật', 'Khoa Kinh tế', 'Student',
    true, '2026-06-17T00:00:00.000Z', '2026-06-17T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  )
ON CONFLICT ("email") DO UPDATE SET
  "passwordHash" = EXCLUDED."passwordHash",
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  "name" = EXCLUDED."name",
  "role" = EXCLUDED."role",
  "organization" = EXCLUDED."organization",
  "affiliation" = EXCLUDED."affiliation",
  "profession" = EXCLUDED."profession",
  "isActive" = true,
  "emailVerifiedAt" = EXCLUDED."emailVerifiedAt",
  "termsAcceptedAt" = EXCLUDED."termsAcceptedAt",
  "updatedAt" = CURRENT_TIMESTAMP;
