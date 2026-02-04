-- Team Members (Jamoa a'zolari)
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'author')),
    avatar_url TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Articles (Maqolalar)
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    excerpt_uz TEXT,
    excerpt_en TEXT,
    excerpt_ru TEXT,
    excerpt_tr TEXT,
    author TEXT,
    date DATE DEFAULT CURRENT_DATE,
    category TEXT,
    image_url TEXT,
    content_uz TEXT,
    content_en TEXT,
    content_ru TEXT,
    content_tr TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Videos (Videolar)
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    duration TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    author TEXT,
    type TEXT CHECK (type IN ('Darslik', 'Hujjatli', 'Suhbat')),
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Books (Kitoblar)
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    author TEXT,
    year TEXT,
    cover_url TEXT,
    description_uz TEXT,
    description_en TEXT,
    description_ru TEXT,
    description_tr TEXT,
    download_url TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creators (Ijodkorlar)
CREATE TABLE creators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role_uz TEXT,
    role_en TEXT,
    role_ru TEXT,
    role_tr TEXT,
    avatar_url TEXT,
    bio_uz TEXT,
    bio_en TEXT,
    bio_ru TEXT,
    bio_tr TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events (Tadbirlar)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    date TIMESTAMP WITH TIME ZONE,
    location_uz TEXT,
    location_en TEXT,
    location_ru TEXT,
    location_tr TEXT,
    description_uz TEXT,
    description_en TEXT,
    description_ru TEXT,
    description_tr TEXT,
    is_upcoming BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects (Loyihalar)
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    status TEXT CHECK (status IN ('Jarayonda', 'Yakunlangan', 'Rejada')),
    description_uz TEXT,
    description_en TEXT,
    description_ru TEXT,
    description_tr TEXT,
    image_url TEXT,
    location_uz TEXT,
    location_en TEXT,
    location_ru TEXT,
    location_tr TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Creations (Ijod mahsullari)
CREATE TABLE creations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    author TEXT,
    type TEXT CHECK (type IN ('Vector', 'Concept', 'Artwork')),
    image_url TEXT,
    description_uz TEXT,
    description_en TEXT,
    description_ru TEXT,
    description_tr TEXT,
    download_url TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio
CREATE TABLE portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_uz TEXT NOT NULL,
    title_en TEXT,
    title_ru TEXT,
    title_tr TEXT,
    image_url TEXT NOT NULL,
    year TEXT,
    architect TEXT,
    type_uz TEXT,
    type_en TEXT,
    type_ru TEXT,
    type_tr TEXT,
    created_by UUID REFERENCES team_members(id),
    updated_by UUID REFERENCES team_members(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages (Aloqa xabarlari)
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone_number TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Row Level Security (RLS) - Basic setup
-- For now, we allow public read access to most tables, and public insert to contact_messages.

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON articles FOR SELECT USING (true);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON videos FOR SELECT USING (true);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON books FOR SELECT USING (true);

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON creators FOR SELECT USING (true);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON projects FOR SELECT USING (true);

ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON creations FOR SELECT USING (true);

ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON portfolio FOR SELECT USING (true);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read only for authenticated admin" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
