import { useState } from "react";
const MOCK_RACES = [
{ id: 1, name: "City Marathon 2026", date: "Jun 14, 2026", location: "Downtown Convention Center", address: "123 Main St, Hall B", pickupHours: "8:00 AM - 6:00 PM", distance: "26.2 mi", deliveryFee: 4.99, estimatedTime: "25-40 min" },
{ id: 2, name: "Sunrise 10K", date: "Jun 21, 2026", location: "Riverside Park Pavilion", address: "456 River Rd, Tent A", pickupHours: "7:00 AM - 3:00 PM", distance: "6.2 mi", deliveryFee: 3.49, estimatedTime: "20-35 min" },
{ id: 3, name: "Trail Blazer Half", date: "Jun 28, 2026", location: "Northside Community Center", address: "789 Park Ave, Room 2", pickupHours: "9:00 AM - 5:00 PM", distance: "13.1 mi", deliveryFee: 3.99, estimatedTime: "30-45 min" },
];
const STEPS = ["My Race", "My Registration", "Drop-off Address", "Confirm Request"];
const statusColors = {
"Heading to Packet Pickup": "#f59e0b",
"Bib Retrieved": "#3b82f6",
"On the Way to You": "#8b5cf6",
"Delivered - Good Luck!": "#10b981",
};
export default function BibshipApp() {
const [step, setStep] = useState(0);
const [selectedRace, setSelectedRace] = useState(null);
const [form, setForm] = useState({ email: "", firstName: "", lastName: "", phone: "", qrCode: null });
const [delivery, setDelivery] = useState({ address: "", apt: "", instructions: "" });
const [trackingStatus, setTrackingStatus] = useState("Heading to Packet Pickup");
const [errors, setErrors] = useState({});
const handleSelectRace = (race) => { setSelectedRace(race); setStep(1); };
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
<header style={styles.header}>
<div style={styles.headerInner}>
<span style={styles.logoText}>Bibship</span>
<span style={styles.tagline}>We pick up your bib. You focus on race day.</span>
<a href="tel:+15551234567" style={styles.headerPhone}>(555) 123-4567</a>
</div>
</header>
{step === 0 && (
<div style={styles.hero}>
<div style={styles.heroInner}>
<div style={styles.heroBadge}>Skip the packet pickup line</div>
<h1 style={styles.heroTitle}>Your race bib, delivered to your door.</h1>
<p style={styles.heroSub}>
We will head to the expo, grab your bib using your registration email, and bring everything straight to you.
</p>
<div style={styles.howItWorks}>
<div style={styles.howStep}><span style={styles.howText}>1. Select your race</span></div>
<div style={styles.howArrow}>{">"}</div>
<div style={styles.howStep}><span style={styles.howText}>2. Give us your reg. email</span></div>
<div style={styles.howArrow}>{">"}</div>
<div style={styles.howStep}><span style={styles.howText}>3. We deliver your packet</span></div>
</div>
</div>
</div>
)}
{step > 0 && step < 4 && (
<div style={styles.progressWrap}>
<div style={styles.progressBar}>
{STEPS.map((label, i) => (

<div key={i} style={styles.progressStep}>
<div style={{ ...styles.progressDot, background: i < step ? "#10b981" : i === step - 1 ? "#f97316" : "#e5e7eb", color: i <= step - 1 ? "#fff" : "#9ca3af" }}>
{i < step - 1 ? "v" : i + 1}
</div>
<span style={{ ...styles.progressLabel, color: i <= step - 1 ? "#1f2937" : "#9ca3af" }}>{label}</span>
{i < 3 && <div style={{ ...styles.progressLine, background: i < step - 1 ? "#10b981" : "#e5e7eb" }} />}
</div>
))}
</div>
</div>
)}
<main style={styles.main}>
{step === 0 && (
<div>
<h2 style={styles.sectionTitle}>Which race are you running?</h2>
<p style={styles.sectionSub}>Choose your event below and we will handle the packet pickup.</p>
<div style={styles.raceGrid}>
{MOCK_RACES.map((race) => (
<button key={race.id} style={styles.raceCard} onClick={() => handleSelectRace(race)}>
<div style={styles.raceName}>{race.name}</div>
<div style={styles.raceMeta}>{race.distance} - {race.date}</div>
<div style={styles.raceCardDivider} />
<div style={styles.raceCardBottom}>
<span style={styles.raceDetail}>Location: {race.location}</span>
<span style={styles.raceDetail}>Address: {race.address}</span>
<span style={styles.raceDetail}>Pickup hours: {race.pickupHours}</span>
<span style={styles.raceDetail}>Delivered in {race.estimatedTime}</span>
<span style={styles.deliveryBadge}>${race.deliveryFee.toFixed(2)} delivery</span>
</div>
<div style={styles.requestCta}>Request My Bib</div>
</button>
))}
</div>
</div>
)}
{step === 1 && (
<div>
<button style={styles.backBtn} onClick={() => setStep(0)}>Back to races</button>
<div style={styles.card}>
<div style={styles.selectedRaceBar}>
<span>{selectedRace?.name}</span>
<span style={styles.chip}>{selectedRace?.date}</span>
</div>
<h2 style={styles.cardTitle}>How do we find your bib?</h2>
<p style={styles.cardSub}>Enter the email you used when registering for this race.</p>

<div style={styles.formRow}>
<div style={styles.formGroup}>
<label style={styles.label}>First Name</label>
<input style={{ ...styles.input, ...(errors.firstName ? styles.inputError : {}) }} placeholder="Jane" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
{errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Last Name</label>
<input style={{ ...styles.input, ...(errors.lastName ? styles.inputError : {}) }} placeholder="Doe" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
{errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
</div>
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Registration Email</label>
<input style={{ ...styles.input, ...(errors.email ? styles.inputError : {}) }} placeholder="jane@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
{errors.email && <span style={styles.error}>{errors.email}</span>}
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Phone Number</label>
<input style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }} placeholder="(555) 867-5309" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
{errors.phone && <span style={styles.error}>{errors.phone}</span>}
</div>
<button style={styles.primaryBtn} onClick={handleNext}>Next: Where should we deliver?</button>
</div>
</div>
)}
{step === 2 && (
<div>
<button style={styles.backBtn} onClick={() => setStep(1)}>Back</button>
<div style={styles.card}>
<div style={styles.selectedRaceBar}>
<span>{selectedRace?.name}</span>
<span style={styles.chip}>{selectedRace?.date}</span>
</div>
<h2 style={styles.cardTitle}>Where should we bring your packet?</h2>
<div style={styles.formGroup}>
<label style={styles.label}>Drop-off Address</label>
<input style={{ ...styles.input, ...(errors.address ? styles.inputError : {}) }} placeholder="123 Finish Line Blvd, City, State, ZIP" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} />
{errors.address && <span style={styles.error}>{errors.address}</span>}
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Apt / Suite (optional)</label>
<input style={styles.input} placeholder="e.g. Apt 4B" value={delivery.apt} onChange={(e) => setDelivery({ ...delivery, apt: e.target.value })} />
</div>
<div style={styles.formGroup}>
<label style={styles.label}>Drop-off Instructions (optional)</label>

<textarea style={styles.textarea} placeholder="e.g. Leave at front desk" value={delivery.instructions} onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })} />
</div>
<button style={styles.primaryBtn} onClick={handleNext}>Review My Request</button>
</div>
</div>
)}
{step === 3 && (
<div>
<button style={styles.backBtn} onClick={() => setStep(2)}>Back</button>
<div style={styles.card}>
<h2 style={styles.cardTitle}>Review your request</h2>
<div style={styles.reviewSection}>
<div style={styles.reviewLabel}>Your Race</div>
<div style={styles.reviewValue}>{selectedRace?.name}</div>
<div style={styles.reviewSub}>{selectedRace?.date} - {selectedRace?.distance}</div>
</div>
<div style={styles.reviewSection}>
<div style={styles.reviewLabel}>Pickup Location</div>
<div style={styles.reviewValue}>{selectedRace?.location}</div>
<div style={styles.reviewSub}>{selectedRace?.address}</div>
<div style={styles.reviewSub}>Open: {selectedRace?.pickupHours}</div>
</div>
<div style={styles.reviewSection}>
<div style={styles.reviewLabel}>Registered Runner</div>
<div style={styles.reviewValue}>{form.firstName} {form.lastName}</div>
<div style={styles.reviewSub}>{form.email}</div>
<div style={styles.reviewSub}>{form.phone}</div>
</div>
<div style={styles.reviewSection}>
<div style={styles.reviewLabel}>Delivering To</div>
<div style={styles.reviewValue}>{delivery.address}{delivery.apt ? ", " + delivery.apt : ""}</div>
<div style={styles.reviewSub}>ETA: {selectedRace?.estimatedTime}</div>
</div>
<div style={styles.costBox}>
<div style={styles.costRow}><span>Bib pickup and delivery</span><span>${selectedRace?.deliveryFee.toFixed(2)}</span></div>
<div style={styles.costRow}><span>Service fee</span><span>$1.50</span></div>
<div style={styles.costDivider} />
<div style={{ ...styles.costRow, fontWeight: 700 }}><span>Total</span><span>${totalCost}</span></div>
</div>
<button style={styles.primaryBtn} onClick={handlePlaceOrder}>Request My Bib - ${totalCost}</button>
</div>
</div>
)}
{step === 4 && (
<div>

<div style={styles.card}>
<div style={styles.confirmHeader}>
<h2 style={styles.confirmTitle}>Your bib is on its way!</h2>
<p style={styles.confirmSub}>We are heading to packet pickup now. Sit back and relax!</p>
</div>
<div style={styles.trackingBox}>
<div style={styles.trackingTitle}>Live Status</div>
<div style={styles.trackingSteps}>
{Object.entries(statusColors).map(([status, color]) => {
const statuses = Object.keys(statusColors);
const currentIdx = statuses.indexOf(trackingStatus);
const thisIdx = statuses.indexOf(status);
const active = thisIdx === currentIdx;
const done = thisIdx < currentIdx;
return (
<div key={status} style={styles.trackingRow}>
<div style={{ ...styles.trackingDot, background: done ? "#10b981" : active ? color : "#e5e7eb" }}>
{done ? "v" : active ? "*" : "o"}
</div>
<span style={{ ...styles.trackingLabel, color: done ? "#10b981" : active ? color : "#9ca3af", fontWeight: active ? 700 : 400 }}>
{status}
</span>
</div>
);
})}
</div>
</div>
<div style={styles.confirmDetails}>
<div style={styles.confirmDetailRow}><span style={styles.confirmDetailKey}>Runner</span><span>{form.firstName} {form.lastName}</span></div>
<div style={styles.confirmDetailRow}><span style={styles.confirmDetailKey}>Email</span><span>{form.email}</span></div>
<div style={styles.confirmDetailRow}><span style={styles.confirmDetailKey}>Drop-off</span><span>{delivery.address}</span></div>
<div style={styles.confirmDetailRow}><span style={styles.confirmDetailKey}>ETA</span><span>{selectedRace?.estimatedTime}</span></div>
</div>
<div style={styles.goodLuckBox}>Good luck on race day, {form.firstName}! You have got this.</div>
<button style={styles.ghostBtn} onClick={() => { setStep(0); setSelectedRace(null); setForm({ email: "", firstName: "", lastName: "", phone: "", qrCode: null }); setDelivery({ address: "", apt: "", instructions: "" }); setTrackingStatus("Heading to Packet Pickup"); }}>
Request another bib
</button>
</div>
</div>
)}
</main>
<div style={styles.stickyPhone}>
<span style={styles.stickyPhoneText}>Questions? Call or text us:</span>
<a href="tel:+15551234567" style={styles.stickyPhoneNumber}>(555) 123-4567</a>
</div>
</div>

);
}
const styles = {
root: { minHeight: "100vh", background: "#fafaf8", fontFamily: "Georgia, serif", paddingBottom: 56 },
header: { background: "#111827" },
headerInner: { maxWidth: 960, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 },
logoText: { fontSize: "1.5rem", fontWeight: 800, color: "#f97316" },
tagline: { color: "#6b7280", fontSize: "0.82rem", marginLeft: "auto", fontStyle: "italic" },
headerPhone: { color: "#fb923c", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none" },
hero: { background: "linear-gradient(135deg, #111827 0%, #1f2937 60%, #111827 100%)", borderBottom: "3px solid #f97316", padding: "52px 24px 44px" },
heroInner: { maxWidth: 700, margin: "0 auto", textAlign: "center" },
heroBadge: { display: "inline-block", background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", borderRadius: 20, padding: "5px 14px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 18 },
heroTitle: { fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16 },
heroSub: { color: "#9ca3af", fontSize: "1rem", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 28px" },
howItWorks: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" },
howStep: { background: "#1f2937", border: "1px solid #374151", borderRadius: 12, padding: "12px 18px" },
howText: { color: "#d1d5db", fontSize: "0.78rem" },
howArrow: { color: "#f97316", fontSize: "1.2rem", fontWeight: 700 },
progressWrap: { background: "#fff", borderBottom: "1px solid #e5e7eb" },
progressBar: { maxWidth: 960, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", overflowX: "auto" },
progressStep: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
progressDot: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700 },
progressLabel: { fontSize: "0.8rem", fontWeight: 500, whiteSpace: "nowrap" },
progressLine: { width: 32, height: 2, marginLeft: 8 },
main: { maxWidth: 960, margin: "0 auto", padding: "32px 24px 60px" },
sectionTitle: { fontSize: "1.8rem", fontWeight: 800, color: "#111827", marginBottom: 6 },
sectionSub: { color: "#6b7280", marginBottom: 28, fontSize: "1rem" },
raceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 20 },
raceCard: { background: "#fff", border: "2px solid #e5e7eb", borderRadius: 16, padding: "20px", cursor: "pointer", textAlign: "left", outline: "none" },
raceName: { fontWeight: 700, fontSize: "1.05rem", color: "#111827" },
raceMeta: { fontSize: "0.82rem", color: "#9ca3af", marginTop: 2, marginBottom: 14 },
raceCardDivider: { height: 1, background: "#f3f4f6", marginBottom: 14 },
raceCardBottom: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 },
raceDetail: { fontSize: "0.82rem", color: "#6b7280" },
deliveryBadge: { display: "inline-block", background: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa", borderRadius: 20, padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700, marginTop: 4 },
requestCta: { marginTop: 4, color: "#f97316", fontWeight: 700, fontSize: "0.88rem", textAlign: "right" },
backBtn: { background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "0.9rem", padding: "0 0 16px 0", fontFamily: "inherit" },
card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: "32px", maxWidth: 580 },
selectedRaceBar: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: "10px 16px", marginBottom: 24, fontSize: "0.9rem", fontWeight: 600, color: "#92400e" },
chip: { background: "#f97316", color: "#fff", borderRadius: 20, padding: "2px 10px", fontSize: "0.78rem", fontWeight: 700 },
cardTitle: { fontSize: "1.4rem", fontWeight: 800, color: "#111827", marginBottom: 6 },
cardSub: { color: "#6b7280", fontSize: "0.92rem", marginBottom: 20, lineHeight: 1.6 },
formRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
formGroup: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 },
label: { fontSize: "0.8rem", fontWeight: 700, color: "#374151", textTransform: "uppercase" },
input: { border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: "0.95rem", fontFamily: "inherit", color: "#111827", outline: "none", background: "#fafaf8" },

inputError: { borderColor: "#ef4444" },
textarea: { border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 14px", fontSize: "0.95rem", fontFamily: "inherit", color: "#111827", outline: "none", minHeight: 90, resize: "vertical", background: "#fafaf8" },
error: { color: "#ef4444", fontSize: "0.78rem" },
primaryBtn: { width: "100%", background: "#f97316", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 8 },
reviewSection: { borderBottom: "1px solid #f3f4f6", paddingBottom: 16, marginBottom: 16 },
reviewLabel: { fontSize: "0.72rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", marginBottom: 4 },
reviewValue: { fontSize: "1rem", fontWeight: 700, color: "#111827" },
reviewSub: { fontSize: "0.85rem", color: "#6b7280", marginTop: 3 },
costBox: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px", marginBottom: 20 },
costRow: { display: "flex", justifyContent: "space-between", fontSize: "0.92rem", color: "#374151", marginBottom: 8 },
costDivider: { height: 1, background: "#e5e7eb", margin: "10px 0" },
confirmHeader: { textAlign: "center", marginBottom: 28 },
confirmTitle: { fontSize: "1.8rem", fontWeight: 800, color: "#111827" },
confirmSub: { color: "#6b7280", fontSize: "0.95rem", marginTop: 8, lineHeight: 1.6 },
trackingBox: { background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 14, padding: "20px 24px", marginBottom: 24 },
trackingTitle: { fontWeight: 800, fontSize: "0.85rem", color: "#374151", textTransform: "uppercase", marginBottom: 16 },
trackingSteps: { display: "flex", flexDirection: "column", gap: 14 },
trackingRow: { display: "flex", alignItems: "center", gap: 12 },
trackingDot: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0 },
trackingLabel: { fontSize: "0.95rem" },
confirmDetails: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 20, fontSize: "0.88rem" },
confirmDetailRow: { display: "flex", gap: 12, color: "#374151" },
confirmDetailKey: { fontWeight: 700, minWidth: 90, color: "#9ca3af", textTransform: "uppercase", fontSize: "0.75rem" },
goodLuckBox: { background: "linear-gradient(135deg, #fff7ed, #fef3c7)", border: "1px solid #fed7aa", borderRadius: 12, padding: "14px 18px", fontSize: "0.92rem", fontWeight: 600, color: "#92400e", textAlign: "center", marginBottom: 20 },
stickyPhone: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#111827", borderTop: "2px solid #f97316", display: "flex", alignItems: "center", justifyContent: "center", gap: 14, padding: "12px 24px", zIndex: 100 },
stickyPhoneText: { color: "#9ca3af", fontSize: "0.82rem" },
stickyPhoneNumber: { color: "#f97316", fontWeight: 800, fontSize: "0.95rem", textDecoration: "none" },
ghostBtn: { width: "100%", background: "none", color: "#f97316", border: "2px solid #f97316", borderRadius: 12, padding: "12px", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" },
};