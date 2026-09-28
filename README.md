# Developer Portfolio (React + Vite)

React နဲ့ ဖန်တီးထားတဲ့ developer portfolio template တစ်ခုပါ။ Dark theme + monospace accent
ပါဝင်ပြီး၊ "system status / build log" ပုံစံနဲ့ design လုပ်ထားပါတယ်။

## 1. Local မှာ run လုပ်ကြည့်ရန်

Node.js (v18 or above) ကို install လုပ်ထားဖို့လိုပါတယ်: https://nodejs.org

```bash
npm install
npm run dev
```

`http://localhost:5173` ကို browser မှာ ဖွင့်ကြည့်ပါ။

## 2. Content ကို ကိုယ်ပိုင်ဖြစ်အောင် ပြင်ရန်

အောက်ပါ file တွေကို ပြင်ပါ:

- `src/App.jsx` — နာမည်, role, about, skills, experience, projects, contact links အားလုံးကို ဒီ file မှာ ပြင်နိုင်ပါတယ်
- `index.html` — page title နှင့် meta description
- `src/index.css` — အရောင်တွေ (`:root` ထဲက CSS variables) ကို ပြောင်းချင်ရင် ဒီမှာ ပြင်ပါ

Resume PDF ကို ထည့်ချင်ရင် `public/resume.pdf` အဖြစ် ထည့်ပါ (public folder ကို အရင်ဖန်တီးပါ)။

## 3. GitHub Pages ပေါ် Deploy လုပ်ရန်

### Option A — GitHub Actions (auto-deploy, အကြံပြုချင်တာ)

1. GitHub မှာ repository အသစ်တစ်ခု ဖန်တီးပါ
2. ဒီ project ကို push လုပ်ပါ:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. Repository Settings > Pages ကို သွားပါ
4. "Build and deployment" > Source ကို **GitHub Actions** လို့ ရွေးပါ
5. `main` branch ကို push လုပ်တိုင်း အလိုအလျောက် build + deploy ဖြစ်သွားပါမယ် (workflow file: `.github/workflows/deploy.yml` ထဲမှာ ပါပြီးသားပါ)

**အရေးကြီးတယ်:** `vite.config.js` ထဲက `base` value ကို စစ်ပါ:
- Repository နာမည်ကို `YOUR_USERNAME.github.io` လို့ တိတိကျကျ ပေးထားရင် → `base: '/'` အတိုင်း ထားလို့ရပါတယ်
- Repository တခြားနာမည် (ဥပမာ `portfolio`) သုံးရင် → `base: '/portfolio/'` လို့ ပြောင်းပါ

### Option B — gh-pages package (manual deploy)

```bash
npm run build
npm run deploy
```

ဒါက `dist` folder ကို `gh-pages` branch ပေါ် တင်ပေးပါလိမ့်မယ်။ Settings > Pages မှာ Source ကို
`gh-pages` branch လို့ ရွေးပေးရပါမယ်။

## Structure

```
├── index.html
├── src/
│   ├── App.jsx       # အဓိက content အားလုံးရှိတဲ့နေရာ
│   ├── index.css     # Styling + color tokens
│   └── main.jsx
└── .github/workflows/deploy.yml   # Auto-deploy workflow
```
