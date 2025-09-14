# 🌐 FlowTrace Verify

FlowTrace Verify is a transparency and accountability platform that makes financial flows inside **government institutions** and **colleges** clear, trustworthy, and easy to understand. It helps citizens, students, and parents track how money is collected, allocated, and spent — backed by **blockchain ledgering** for authenticity and traceability.

---

## 🚀 Features

### 🔹 Government Mode

* **Funds Flow Hierarchy**: Tracks money from **National Health Fund → State Departments → Hospitals → Departments**.
* **Blockchain Ledgering**: Every transaction is immutably stored on blockchain to prevent tampering.
* **Donations**: Citizens can donate directly via **MetaMask wallet**. Donations instantly reflect in the **National Health Fund donation history**.
* **Anomaly Detection**: Alerts trigger for budget overruns or unusual transactions. Alerts can be exported as **PDF reports**.
* **Visualization**: Interactive hierarchical diagrams, charts, and graphs for budget distribution and spending patterns.
* **Transaction Export**: Download full transaction history as CSV or JSON.

### 🔹 Institution Mode

* **Funds Flow Hierarchy**: Tracks money from **Institution Funds → Departments (CSE, EEE, etc.) → Student Projects → Events**.
* **Fee Payments**: Students/parents can pay fees via **MetaMask wallet**, with payments reflected instantly in the institution’s funds.
* **Transparency**: View **total fees collected, government aid, and donations** alongside department allocations.
* **Student Projects & Events**: Visual tracking of how departmental funds flow into projects and activities.

### 🔹 Shared Features

* **Community Feedback**: Add suggestions or concerns on specific budget items via a simple feedback button.
* **Search & Filter**: Quickly find transactions by department, vendor, or project inside the FundsFlow container.
* **User Accounts**: Sign up and log in via **Supabase authentication**.
* **Blockchain-backed**: Transactions are reliable, traceable, and verifiable.

---

## 🏗️ System Workflow

1. **User Authentication**

   * Users sign up or log in through Supabase.

2. **FundsFlow Tracking**

   * Hierarchical visualizations show how money flows from **sources → allocations → spending**.

3. **Blockchain Ledgering**

   * Every transaction (fees, donations, allocations, payments) is written to blockchain.

4. **Anomaly Detection**

   * ML-based monitoring raises alerts when spending patterns deviate (e.g., budget overruns).

5. **Community Interaction**

   * Users can leave feedback on specific fund items.

6. **Export & Sharing**

   * Transaction history and anomaly alerts can be downloaded as CSV/PDF for transparency.

---

## 📊 Tech Stack

* **Frontend**: React + Vite + TypeScript + Tailwind
* **Backend**: Supabase (auth + database), Blockchain (Ethereum/Polygon, MetaMask)
* **Visualization**: D3.js / Recharts
* **Auth & Wallet**: Supabase + MetaMask
* **Anomaly Detection**: ML-based anomaly detection (Python/Node integration)

---

## ⚡ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/<your-username>/flowtrace-verify.git
cd flowtrace-verify
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run locally

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

---

## 📌 Usage Guide

### Government Mode

1. Open **Government tab**.
2. View National → State → Hospital fund flows.
3. Donate via wallet → transaction shows in donation history.
4. Export transaction history or anomaly alerts.

### Institution Mode

1. Open **Institution tab**.
2. View Institution Funds → Departments → Projects/Events flow.
3. Pay fees via wallet → transaction shows in fee payment history.
4. Track department budgets, salaries, and events.

---

## 🧑‍🤝‍🧑 Contributors

* **Victowolf (Yash R. Hosalli)** – Developer & Architect

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use, modify, and distribute with attribution.

---

## 🌟 Vision

FlowTrace Verify is built for **hackathons, governments, and institutions** aiming to improve **financial transparency** and **public trust**.

> Trust grows when money has nothing to hide. 🌍

---

### Optional: Add screenshots or GIFs

Place screenshots in `/docs/screenshots` and reference them in this README when ready. Replace the placeholders below as needed:

```markdown
![Landing page](docs/screenshots/landing.png)
![Government dashboard - FundsFlow](docs/screenshots/gov-dashboard.png)
![Institution dashboard - FundsFlow](docs/screenshots/inst-dashboard.png)
```
