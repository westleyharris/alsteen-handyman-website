# Alsteen Handyman LLC - Website

A modern, responsive single-page website for Alsteen Handyman LLC, a professional handyman service in Forney, TX.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Quote Request Form**: Contact form that sends emails directly to the business
- **Before/After Gallery**: Showcase section for project photos
- **Social Media Integration**: Links to Facebook, Nextdoor, and Google Reviews
- **Service Areas**: Clear display of all service locations
- **Business Information**: Hours, contact info, and address prominently displayed

## Setup Instructions

### 1. Logo

Place your company logo as `logo.png` in the root directory. The logo should be:
- Recommended size: 200x50px or similar aspect ratio
- Format: PNG with transparent background (preferred) or JPG
- If no logo is provided, the company name will be displayed as text

### 2. Before/After Images

Replace the placeholder gallery items with actual before/after photos:

1. Open `index.html`
2. Find the `.gallery-grid` section
3. Replace the `.gallery-image-placeholder` divs with actual `<img>` tags:

```html
<div class="gallery-item">
    <img src="images/before1.jpg" alt="Before project 1" class="gallery-image">
    <img src="images/after1.jpg" alt="After project 1" class="gallery-image">
</div>
```

You can add more gallery items as needed. Make sure to:
- Create an `images/` folder for your photos
- Use descriptive alt text for accessibility
- Keep image file sizes reasonable (under 500KB each recommended)

### 3. Form Submission Setup

The website is configured to use Formspree for form submissions, which supports file uploads. You'll need to set up a free Formspree account.

#### Option A: Formspree (Recommended - Supports File Uploads)
1. Sign up for a free account at https://formspree.io/
2. Create a new form
3. Set the recipient email to: `alsteenhandyman@yahoo.com`
4. Copy your form endpoint (looks like: `https://formspree.io/f/xxxxxxxxxx`)
5. Open `script.js` and replace `YOUR_FORM_ID` in the `FORMSPREE_ENDPOINT` variable with your form ID
6. Free tier includes:
   - 50 submissions per month
   - File upload support (up to 10MB per file)
   - No credit card required

#### Option B: FormSubmit.co (Alternative - No File Uploads)
If you prefer FormSubmit.co (simpler but no file attachments):
1. Open `script.js`
2. Find the commented FormSubmit.co code
3. Uncomment the FormSubmit.co fetch code
4. Comment out the Formspree code
5. Note: FormSubmit.co free tier does NOT support file attachments

#### Option B: EmailJS (Alternative Option)
1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update `script.js` with your keys:
   ```javascript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```
6. Uncomment the EmailJS initialization code in `script.js`
7. Update the form submission handler to use EmailJS

#### Option C: Formspree (Paid Service)
- Supports file uploads
- More reliable than free services
- Sign up at https://formspree.io/
- Update the form action in `index.html`

### 4. Social Media Links

Update the social media links if needed:
- Facebook: Currently set to the profile URL
- Nextdoor: Currently set to the business page URL  
- Google Reviews: Currently set to the Google Maps listing URL

Verify these URLs are correct and update them in:
- The contact section (`.social-links`)
- The footer section (`.footer-social`)

### 5. Customization

You can customize the website by editing:
- **Colors**: Update CSS variables in `styles.css` (`:root` section)
- **Content**: Edit text in `index.html`
- **Styling**: Modify `styles.css` for layout and design changes

## Deployment

### GitHub Setup

1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Connect and push:
   ```bash
   git remote add origin https://github.com/yourusername/alsteen-handyman-website.git
   git branch -M main
   git push -u origin main
   ```

### Cloudflare Pages Deployment

1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Connect your GitHub repository
4. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`
5. Click "Save and Deploy"
6. Your site will be live at `your-project.pages.dev`

### Custom Domain Setup (NameCheap)

1. In Cloudflare Pages, go to your project → Custom domains
2. Click "Set up a custom domain"
3. Enter your domain name
4. Follow Cloudflare's instructions to update DNS records in NameCheap:
   - Add a CNAME record pointing to your Cloudflare Pages URL
   - Or update nameservers to Cloudflare (recommended)

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── logo.png            # Company logo (add your logo here)
├── images/             # Before/after photos folder (create this)
│   ├── before1.jpg
│   ├── after1.jpg
│   └── ...
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The website is designed to be low-maintenance with no dynamic content that requires frequent updates
- All business information is static and won't need regular changes
- The gallery section can be updated with new photos as needed
- The form sends directly to the business email - no backend required

## Support

For questions or issues, please contact the developer or refer to the documentation of the form submission service you choose to use.

## License

© 2024 Alsteen Handyman LLC. All rights reserved.

