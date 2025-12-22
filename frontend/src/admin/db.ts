
export const DB = {
  "currentUser": {
    "id": "1",
    "name": "Biloliddin Tursunov",
    "email": "biloliddin@memor.uz",
    "phone": "+998 90 123 45 67",
    "role": "Lead Admin",
    "department": "Management",
    "avatar": "Biloliddin",
    "projects": ["it-website", "it-mobile", "marketing-content"]
  },
  "initialUsers": [
    { 
      "id": "1", 
      "name": "Biloliddin Tursunov", 
      "email": "biloliddin@memor.uz", 
      "phone": "+998 90 123 45 67",
      "role": "Lead Admin", 
      "department": "Management", 
      "avatar": "Biloliddin",
      "projects": ["it-website", "it-mobile", "marketing-content"],
      "activities": [
        { "id": "l1", "path": "/dashboard", "action": "Login", "targetName": "System Access", "entryTime": "09:00", "duration": "4h 20m", "device": "Desktop", "date": "2025-05-21" },
        { "id": "l2", "path": "/cms/studio", "action": "Edit", "targetName": "Modernizm Maqolasi", "entryTime": "11:30", "duration": "45m", "device": "Desktop", "date": "2025-05-21", "metadata": "(+420 words)" }
      ]
    },
    { 
      "id": "2", 
      "name": "Alex Kaplan", 
      "email": "alex@memor.design", 
      "phone": "+998 93 555 11 22",
      "role": "Admin", 
      "department": "IT Dept", 
      "avatar": "Alex",
      "projects": ["it-website", "it-mobile"],
      "activities": [
        { "id": "l3", "path": "/projects/it-website", "action": "Task Action", "targetName": "Landing Page Fix", "entryTime": "14:20", "duration": "1h 10m", "device": "Desktop", "date": "2025-05-21", "metadata": "Status: Review" }
      ]
    },
    { 
      "id": "3", 
      "name": "Sarah Miller", 
      "email": "sarah@memor.design", 
      "phone": "+998 99 888 77 66",
      "role": "Editor", 
      "department": "Marketing", 
      "avatar": "Sarah",
      "projects": ["marketing-content"],
      "activities": [
        { "id": "l5", "path": "/inbox", "action": "View", "targetName": "Messaging Center", "entryTime": "10:15", "duration": "25m", "device": "Tablet", "date": "2025-05-20" }
      ]
    },
    { 
      "id": "4", 
      "name": "Aziz Rahimov", 
      "email": "aziz@memor.uz", 
      "phone": "+998 91 333 44 55",
      "role": "Admin", 
      "department": "IT Dept", 
      "avatar": "Aziz",
      "projects": ["it-website"],
      "activities": []
    }
  ],
  "initialTasks": [
    { 
      "id": "web-1", 
      "projectId": "it-website",
      "name": "Landing Page UI Refinement", 
      "status": "In Progress", 
      "startDate": "2025-05-01", 
      "deadline": "2025-05-15", 
      "assignees": [{"name": "Alex Kaplan", "avatar": "Alex"}, {"name": "Sarah Miller", "avatar": "Sarah"}], 
      "createdBy": "Biloliddin", 
      "icon": "Palette", 
      "iconColor": "#9333ea",
      "taskType": "Design", 
      "taskTypeColor": "purple", 
      "format": "Figma", 
      "description": "Asosiy sahifadagi ranglar va tipografikani Notion uslubiga moslashtirish." 
    },
    { 
      "id": "mob-1", 
      "projectId": "it-mobile",
      "name": "Mobile App v2 Architecture", 
      "status": "Review", 
      "startDate": "2025-05-10", 
      "deadline": "2025-05-25", 
      "assignees": [{"name": "Alex Kaplan", "avatar": "Alex"}], 
      "createdBy": "Biloliddin", 
      "icon": "Cpu", 
      "iconColor": "#ea580c",
      "taskType": "Dev", 
      "taskTypeColor": "orange", 
      "format": "React Native", 
      "description": "Ilovaning yangi arxitekturasini ishlab chiqish." 
    },
    { 
      "id": "mkt-1", 
      "projectId": "marketing-content",
      "name": "SMM Content Strategy May", 
      "status": "Boshlanmadi", 
      "startDate": "2025-05-18", 
      "deadline": "2025-05-30", 
      "assignees": [{"name": "Sarah Miller", "avatar": "Sarah"}], 
      "createdBy": "Sarah Miller", 
      "icon": "Megaphone", 
      "iconColor": "#db2777",
      "taskType": "Marketing", 
      "taskTypeColor": "pink", 
      "format": "Notion", 
      "description": "May oyi uchun barcha ijtimoiy tarmoqlar rejasini tasdiqlash." 
    },
    { 
      "id": "web-2", 
      "projectId": "it-website",
      "name": "Database Schema Optimization", 
      "status": "Done", 
      "startDate": "2025-04-20", 
      "deadline": "2025-05-05", 
      "assignees": [{"name": "Aziz Rahimov", "avatar": "Aziz"}], 
      "createdBy": "Biloliddin", 
      "icon": "Database", 
      "iconColor": "#2563eb",
      "taskType": "Backend", 
      "taskTypeColor": "blue", 
      "format": "PostgreSQL", 
      "description": "SQL so'rovlarini optimallashtirish va indexlar qo'shish." 
    }
  ],
  "initialCmsPosts": [
    { 
      "id": "post-1", 
      "projectId": "it-website",
      "name": "Modernizm durdonalari", 
      "title": "O'zbekiston modernizmi: Kecha va bugun",
      "status": "Published", 
      "deadline": "2025-05-18", 
      "taskType": "ARTICLES",
      "domain": "KNOWLEDGE",
      "category": "ARTICLES",
      "icon": "Building",
      "assignees": [{"name": "Alex Kaplan", "avatar": "Alex"}],
      "content": "Ushbu maqolada Toshkent modernizmi tarixi haqida so'z boradi...",
      "coverImage": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200"
    },
    { 
      "id": "post-2", 
      "projectId": "marketing-content",
      "name": "SMM Trends 2025", 
      "title": "Raqamli marketingda yangi trendlar",
      "status": "Draft", 
      "deadline": "2025-06-01", 
      "taskType": "RESEARCH",
      "domain": "MOVEMENT",
      "category": "TRENDS",
      "icon": "Zap",
      "assignees": [{"name": "Sarah Miller", "avatar": "Sarah"}],
      "content": "2025-yilda kutilayotgan asosiy o'zgarishlar va AI roli.",
      "coverImage": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200"
    }
  ],
  "initialMedia": [
    { "id": "m1", "name": "Render_Main.png", "type": "image", "size": "4.8 MB", "date": "Hozir", "url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000", "tags": ["Render", "IT"], "uploader": "Alex" },
    { "id": "m2", "name": "Strategy_v1.pdf", "type": "doc", "size": "2.5 MB", "date": "2025-05-20", "url": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000", "tags": ["Marketing", "Plan"], "uploader": "Sarah" }
  ],
  "initialExhibition": [
    { 
      "id": "ex1", 
      "studentName": "Aziz Rahimov", 
      "projectTitle": "Buxoro Modern Architecture", 
      "image": "https://images.unsplash.com/photo-1487958444920-f718b5024419?w=1200", 
      "year": "2024", 
      "category": "Architecture", 
      "description": "Historical patterns in modern design. Explorations into the fusion of cultural heritage and contemporary urban planning."
    }
  ],
  "initialFinance": [
    {
      "id": "fin-1",
      "date": "2025-05-10",
      "amount": 50000000,
      "currency": "UZS",
      "type": "Kirim",
      "category": "Investitsiya",
      "description": "IT loyihalarni rivojlantirish uchun boshlang'ich sarmoya",
      "createdBy": "Biloliddin Tursunov"
    }
  ]
};
