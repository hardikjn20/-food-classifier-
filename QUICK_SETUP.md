# ⚡ QUICK SETUP - 5 MINUTES TO LIVE APP

## 🎯 What You'll Get
- ✅ Food image classifier running locally
- ✅ Live on internet via Vercel
- ✅ Free AI model (Hugging Face)
- ✅ GitHub backup
- ✅ Ready to submit to Bizbytech

---

## 📝 STEP 1: Get Your Free AI Token (2 minutes)

### Go Here:
https://huggingface.co/settings/tokens

### Do This:
1. Click "Sign up" if you don't have account (email only, no credit card)
2. Verify email
3. Go back to: https://huggingface.co/settings/tokens
4. Click "New token"
5. Name it: `Food Classifier`
6. Select: "Read"
7. Click "Create token"
8. **Copy the full token** (starts with `hf_`)

### Save it somewhere safe (you'll need it 3 times!)

---

## 💻 STEP 2: Run Locally (2 minutes)

```bash
# Go to project folder
cd c:\tmp\food-classifier

# Install dependencies
npm install

# Open .env.local in any text editor, paste your token:
# HUGGING_FACE_API_TOKEN=hf_YOUR_TOKEN_HERE

# Start development server
npm run dev
```

### Open in browser:
- http://localhost:3001
- Upload any food image
- Click analyze
- See results! 🎉

---

## 🐙 STEP 3: Push to GitHub (1 minute)

### First time setup:
```bash
git init
git add .
git commit -m "Food classifier with Hugging Face AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/food-classifier.git
git push -u origin main
```

**Note**: Create empty repository on GitHub.com first if you haven't!

### If already on GitHub:
```bash
git add .
git commit -m "Updated to Hugging Face AI model"
git push origin main
```

---

## 🚀 STEP 4: Deploy to Vercel (1-2 minutes)

### Go Here:
https://vercel.com/new

### Do This:
1. Click "Import Project"
2. Select your GitHub repository
3. Click "Import"
4. Go to "Environment Variables" section
5. Add variable:
   - **Name**: `HUGGING_FACE_API_TOKEN`
   - **Value**: Paste your token here (hf_...)
6. Click "Deploy"

### Wait 2-5 minutes...

### Get your live URL! ✅
- Example: https://food-classifier-abc123.vercel.app
- Share this URL with anyone!
- It's live on internet now!

---

## 📊 VERIFY IT WORKS

### Test locally:
- http://localhost:3001
- Upload food image
- Should show analysis

### Test on Vercel:
- https://your-vercel-url.vercel.app
- Same test
- Should work!

---

## ❌ COMMON ISSUES

### "Token not configured"
- Did you paste token in Vercel environment variables?
- Go to Vercel > Project > Settings > Environment Variables
- Add it again, then click "Redeploy"

### "Model not found"
- Check Hugging Face token is correct (starts with `hf_`)
- Token must have Read access

### Image won't upload
- File must be < 10MB
- Must be: JPG, PNG, WebP, or GIF
- Try different image

---

## 🎓 WHAT EACH FILE DOES

| File | Purpose |
|------|---------|
| `lib/aiService.ts` | Talks to Hugging Face AI |
| `app/page.tsx` | Main page with upload |
| `.env.local` | Your secret API token |
| `package.json` | List of code libraries |
| `app/api/analyze/route.ts` | Backend endpoint |

---

## 🔐 KEEP SAFE

- ✅ Never share your token publicly
- ✅ `.env.local` is private (in .gitignore)
- ✅ Only put token in Vercel settings
- ✅ Safe to share GitHub link (token not included)

---

## 📞 QUICK LINKS

| What | Where |
|------|-------|
| Get Hugging Face Token | https://huggingface.co/settings/tokens |
| Deploy to Vercel | https://vercel.com/new |
| GitHub Setup | https://docs.github.com/en/repositories |
| Project Docs | See DEPLOYMENT_GUIDE.md |
| Full Explanation | See MY_EXPLANATION.md |

---

## ✨ YOU'RE DONE!

Your food quality classifier is now:
- ✅ Running on your computer
- ✅ Backed up on GitHub
- ✅ Live on internet
- ✅ Ready to impress

**Next**: Submit link to Bizbytech! 🚀

---

**Questions?** Check DEPLOYMENT_GUIDE.md for detailed help!
