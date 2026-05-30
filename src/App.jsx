import { useState } from "react";
const MOCK_RACES = [
  {
    id: 1,
    name: "City Marathon 2026",
    date: "Jun 14, 2026",
    location: "Downtown Convention Center",
    address: "123 Main St, Hall B",
    pickupHours: "8:00 AM – 6:00 PM",
    distance: "26.2 mi",
    logo: " ",
    deliveryFee: 4.99,
    estimatedTime: "25–40 min",
  },
  {
    id: 2,
    name: "Sunrise 10K",
    date: "Jun 21, 2026",
    location: "Riverside Park Pavilion",
    address: "456 River Rd, Tent A",
    pickupHours: "7:00 AM – 3:00 PM",
    distance: "6.2 mi",
    logo: " ",
    deliveryFee: 3.49,
    estimatedTime: "20–35 min",
  },
  {
    id: 3,
    name: "Trail Blazer Half",
    date: "Jun 28, 2026",
    location: "Northside Community Center",
    address: "789 Park Ave, Room 2",
    pickupHours: "9:00 AM – 5:00 PM",
    distance: "13.1 mi",
    logo: " ",
    deliveryFee: 3.99,
    estimatedTime: "30–45 min",
  },
];
const STEPS = ["My Race", "My Registration", "Drop-off Address", "Confirm Request"];
const statusColors = {
  "Heading to Packet Pickup": "#f59e0b",
  "Bib Retrieved": "#3b82f6",
  "On the Way to You": "#8b5cf6",
  "Delivered — Good Luck!": "#10b981",
};
export default function BibshipApp() {
  const [step, setStep] = useState(0);
  const [selectedRace, setSelectedRace] = useState(null);
  const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "", qrCode: null });
  const [delivery, setDelivery] = useState({ address: "", apt: "", instructions: "" });
  const [trackingStatus, setTrackingStatus] = useState("Heading to Packet Pickup");
  const [errors, setErrors] = useState({});
  const handleSelectRace = (race) => {
    setSelectedRace(race);
    setStep(1);
  };
  const validateStep1 = () => {
    const e = {};
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = "Valid email required";
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.phone.match(/^[\d\s()\-+]{7,}$/)) e.phone = "Valid phone number required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    if (!delivery.address.trim()) e.address = "Drop-off address required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setErrors({});
    setStep((s) => s + 1);
  };
  const handlePlaceOrder = () => {
    setStep(4);
    const statuses = Object.keys(statusColors);
    statuses.forEach((s, i) => setTimeout(() => setTrackingStatus(s), i * 4000));
  };
  const totalCost = selectedRace ? (selectedRace.deliveryFee + 1.5).toFixed(2) : "0.00";
  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}> </span>
            <span style={styles.logoText}>Bibship</span>
          </div>
          <span style={styles.tagline}>We pick up your bib. You focus on race day.</span>
          <a href="tel:+15551234567" style={styles.headerPhone}>  (555) 123-4567</a>
        </div>
      </header>
      {/* Hero — only on landing */}
      {step === 0 && (
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.heroBadge}>  Skip the packet pickup line</div>
            <h1 style={styles.heroTitle}>Your race bib,<br />delivered to your door.</h1>
            <p style={styles.heroSub}>
              Can't make it to packet pickup? Busy with race prep? We'll head to the expo,
              grab your bib using your registration email, and bring everything straight to you.
            </p>
            <div style={styles.howItWorks}>
              <div style={styles.howStep}>
                <span style={styles.howIcon}> </span>
                <span style={styles.howText}>Select your race</span>
              </div>
              <div style={styles.howArrow}>→</div>
              <div style={styles.howStep}>
                <span style={styles.howIcon}> </span>
                <span style={styles.howText}>Give us your reg. email</span>
              </div>
              <div style={styles.howArrow}>→</div>
              <div style={styles.howStep}>
                <span style={styles.howIcon}> </span>
                <span style={styles.howText}>We deliver your packet</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      {step > 0 && step < 4 && (
        <div style={styles.progressWrap}>
          <div style={styles.progressBar}>
            {STEPS.map((label, i) => (
              <div key={i} style={styles.progressStep}>
                <div
                  style={{
                    ...styles.progressDot,
                    background: i < step ? "#10b981" : i === step - 1 ? "#f97316" : "#e5e7eb",
                    color: i <= step - 1 ? "#fff" : "#9ca3af",
                  }}
                >
                  {i < step - 1 ? "✓" : i + 1}
                </div>
                <span style={{ ...styles.progressLabel, color: i <= step - 1 ? "#1f2937" : "#9ca3af" }}>
                  {label}
                </span>
                {i < 3 && <div style={{ ...styles.progressLine, background: i < step - 1 ? "#10b981" : "#e5e7eb" }} />}
              </div>
            ))}
          </div>
        </div>
      )}
      <main style={styles.main}>
        {/* Step 0: Race Selection */}
        {step === 0 && (
          <div style={styles.fadeIn}>
            <h2 style={styles.sectionTitle}>Which race are you running?</h2>
            <p style={styles.sectionSub}>Choose your event below and we'll handle the packet pickup for you.</p>
            <div style={styles.raceGrid}>
              {MOCK_RACES.map((race) => (
                <button key={race.id} style={styles.raceCard} onClick={() => handleSelectRace(race)}>
                  <div style={styles.raceCardTop}>
                    <span style={styles.raceEmoji}>{race.logo}</span>
                    <div>
                      <div style={styles.raceName}>{race.name}</div>
                      <div style={styles.raceMeta}>{race.distance} · {race.date}</div>
                    </div>
                  </div>
                  <div style={styles.raceCardDivider} />
                  <div style={styles.raceCardBottom}>
                    <span style={styles.raceDetail}>  {race.location}</span>
                    <span style={styles.raceDetailAddress}>  {race.address}</span>
                    <span style={styles.raceDetail}>  Pickup hours: {race.pickupHours}</span>
                    <span style={styles.raceDetail}>  Delivered in {race.estimatedTime}</span>
                    <span style={styles.deliveryBadge}>${race.deliveryFee.toFixed(2)} delivery fee</span>
                  </div>
                  <div style={styles.requestCta}>Request My Bib →</div>
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Step 1: Registration Info */}
        {step === 1 && (
          <div style={styles.fadeIn}>
            <button style={styles.backBtn} onClick={() => setStep(0)}>← Back to races</button>
            <div style={styles.card}>
              <div style={styles.selectedRaceBar}>
                <span>{selectedRace?.logo} {selectedRace?.name}</span>
                <span style={styles.chip}>{selectedRace?.date}</span>
              </div>
              <h2 style={styles.cardTitle}>How do we find your bib?</h2>
              <p style={styles.cardSub}>
                When you registered for this race, you provided an email address. That's what
                packet pickup uses to look you up — and it's what we'll use to collect your bib on your behalf.
              </p>
              <div style={styles.infoBox}>
                <span style={styles.infoIcon}> </span>
                <span>Check your race confirmation email to find the exact address you registered with.</span>
              </div>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Your First Name</label>
                  <input
                    style={{ ...styles.input, ...(errors.firstName ? styles.inputError : {}) }}
                    placeholder="Jane"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Your Last Name</label>
                  <input
                    style={{ ...styles.input, ...(errors.lastName ? styles.inputError : {}) }}
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                  {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Used at Registration</label>
                <input
                  style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }}
                  placeholder="jane@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
                <p style={styles.hint}>  Must match exactly what you used when signing up for the race.</p>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Phone Number</label>
                <input
                  style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
                  placeholder="(555) 867-5309"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <span style={styles.error}>{errors.phone}</span>}
                <p style={styles.hint}>  We'll only contact you if there's an issue with your bib or delivery.</p>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Registration QR Code <span style={styles.optionalTag}>(Optional)</span></label>
                <p style={styles.hint} >  Some events only accept a QR code at packet pickup. Upload a screenshot from your confirmation email or race app so we can use it on your behalf.</p>
                {!form.qrCode ? (
                  <label style={styles.qrUploadBox}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => setForm({ ...form, qrCode: ev.target.result });
                        reader.readAsDataURL(file);
                      }}
                    />
                    <div style={styles.qrUploadIcon}> </div>
                    <div style={styles.qrUploadText}>Tap to upload your QR code</div>
