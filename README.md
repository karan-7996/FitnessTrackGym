[README.md](https://github.com/user-attachments/files/34902245/README.md)
# Fitness Track Gym (FTG) — Vadodara Branch Showcase

A responsive, interactive website for **Fitness Track Gym (FTG)** that presents its eight Vadodara branches through a visual building carousel. Visitors can explore branch locations, view building imagery, inspect gym interiors, review membership information and testimonials, and request appointments.

## Features

- **Eight-branch showcase:** Browse the FTG locations in Subhanpura, Sama, Waghodia Road, Pratapnagar, Tarsali, Sayajigunj, Vasna-Bhayli, and Karelibaug.
- **Building image carousel:** Displays the supplied transparent PNG building images, with the active branch in full colour and inactive branches in monochrome.
- **Animated transitions:** Smooth branch changes with coordinated position, scale, opacity, colour, and visual-depth transitions.
- **Branch progress indicator:** Shows the current position in the eight-branch carousel and provides quick navigation between branches.
- **Video background:** Uses a looping background video to create a consistent visual stage behind the building showcase.
- **Responsive interface:** Layouts and controls adapt for desktop, tablet, and mobile screens. Mobile users can navigate with touch gestures.
- **Interior navigation view:** Explore gym zones and equipment through the interior-tour interface.
- **Interactive branch map:** View the eight branch locations and open branch details, contact options, and directions.
- **Appointment scheduler:** Request a free trial, personal-training consultation, or InBody scan using the appointment interface.
- **Member stories:** Browse branch-related testimonials with automatic rotation and manual controls.
- **Membership and nutrition information:** Explore the plans, personal-training packages, and FTG nutrition offerings presented in the app.

## Branches

| Branch | Building / location |
|---|---|
| Subhanpura (Head Office) | 3rd Floor, Kirti Square, Subhanpura Road, above Axis Bank |
| Sama | 3rd Floor, Paradise Complex, New Sama |
| Waghodia Road | 5th Floor, Nathdwara Avenue, Dabhoi–Waghodia Ring Road |
| Pratapnagar | 4th Floor, Apsara Skyline, opposite Alpana Talkies |
| Tarsali | 3rd & 4th Floor, Pancham Avenue, Sussen–Tarsali Ring Road |
| Sayajigunj | 1st Floor, Ved Transcube Plaza, Central Bus Station |
| Vasna-Bhayli | 5th Floor, Shyamal Sapphire, near Nilamber Circle |
| Karelibaug | 2nd Floor, Inspirom Building, near Sangam Char Rasta |

*Branch addresses and contact details should be checked against the latest official FTG information before publishing.*

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- lucide-react for interface icons
- CSS animations and transitions
- HTML video for the animated background

## Getting Started

### Requirements

- Node.js (use a current version supported by the project's Vite version)
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

### Type-check and build

If the project has the corresponding scripts configured:

```bash
npx tsc --noEmit
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

The application is organised around the main page, branch data, and reusable feature components. The key files include:

```text
src/
  App.tsx
  index.css
  data/
    branches.ts
  components/
    GymBuilding3D.tsx
    InteriorNavigationView.tsx
    InteractiveVadodaraMap.tsx
    AppointmentModal.tsx
    FlyerPlansDrawer.tsx
    BranchTestimonialOverlay.tsx
```

Your project may contain additional components, assets, and configuration files.

## Assets and Configuration

- Place the eight branch building PNGs in the asset location referenced by `src/data/branches.ts`.
- Keep each image mapped to the correct branch record.
- Ensure the background video URL is reachable, or replace it with a locally hosted video.
- Check that the logo/emblem and any other referenced images exist at their configured paths.
- Review branch phone numbers, addresses, membership prices, opening hours, and appointment availability before using the site publicly.

## Appointment and Map Notes

The appointment interface provides a booking-request experience and confirmation presentation. Unless a booking backend or scheduling provider has been connected and tested, do not treat an on-screen confirmation as a confirmed appointment.

Likewise, map pins and directions should be checked against the exact branch addresses. Live map data, booking persistence, notifications, and real-time slot availability require suitable external services or backend integration.

## Customisation

- **Branch content:** Update `src/data/branches.ts`.
- **Carousel appearance and transitions:** Update `GymBuilding3D.tsx` and `index.css`.
- **Interior tour:** Update `InteriorNavigationView.tsx`.
- **Map and branch details:** Update `InteractiveVadodaraMap.tsx`.
- **Appointment flow:** Update `AppointmentModal.tsx`.
- **Membership content:** Update `FlyerPlansDrawer.tsx`.
- **Testimonials:** Update `BranchTestimonialOverlay.tsx`.

## Before Deployment

1. Verify all eight building images and the logo load correctly.
2. Test the carousel, swipe gestures, progress indicator, and navigation at mobile and desktop widths.
3. Verify all map pins, phone links, WhatsApp links, and directions.
4. Confirm membership prices, branch contact information, operating hours, and appointment rules with FTG.
5. Connect and test a real booking backend if appointments must be stored or confirmed.
6. Run the production build and test the deployed site on real devices.

---

**Fitness Track Gym (FTG) — Vadodara**  
A digital branch discovery and gym experience showcase.
