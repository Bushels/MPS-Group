# AI Context Documentation

This directory contains the "Source of Truth" documentation for the MPS Group project. These files provide critical constraints, design rules, and technical specifications that must be followed when building or modifying this application.

## 📋 Document Index

### [01_TECH_STACK.md](./01_TECH_STACK.md)
**Hard technical rules, package versions, and forbidden libraries.**

Check this file ALWAYS before:
- Installing any new packages
- Choosing between alternative libraries
- Making architectural decisions

Key Contents:
- Core framework specifications (Next.js 14, TypeScript, Tailwind)
- Critical library requirements (lucide-react, framer-motion, Supabase)
- Coding standards ("use client" policy, type safety rules)
- Forbidden libraries and patterns

---

### [02_DESIGN_SYSTEM.md](./02_DESIGN_SYSTEM.md)
**Color codes, fonts, glassmorphism physics, and animation rules.**

Check this file ALWAYS before:
- Styling any UI component
- Implementing animations
- Creating new design elements
- Choosing colors or typography

Key Contents:
- MPS brand colors (Red #D32F2F, Blue #1976D2)
- Industrial Glassmorphism specifications
- Typography standards (Inter, JetBrains Mono)
- Animation guidelines and performance rules
- Micro-interaction patterns

---

### [03_DATA_SCHEMA.md](./03_DATA_SCHEMA.md)
**Supabase table structures, database schema, and TypeScript types.**

Check this file before:
- Writing any backend logic
- Creating database queries
- Implementing data models
- Setting up Supabase integration

Key Contents:
- PipeVault™ inventory schema
- JobTracker system structure
- User and authentication tables
- TypeScript type definitions

---

### [04_TASK_LOG.md](./04_TASK_LOG.md)
**The history of what has been built and the current To-Do list.**

Check this file at:
- **Start of session** - To understand current project state
- **End of session** - To document what was completed

Key Contents:
- Completed features log
- Current tasks in progress
- Known issues and tech debt
- Next priorities

---

## 🎯 How to Use These Documents

### For AI Agents:
1. **Before starting any task**: Read relevant context files
2. **During implementation**: Reference specific constraints
3. **After completion**: Update 04_TASK_LOG.md

### For Developers:
1. **Onboarding**: Read all files in order (01 → 04)
2. **Daily work**: Keep these files open for quick reference
3. **Decision-making**: Consult before making architectural choices

---

## ⚠️ Critical Reminders

> **IMPORTANT**: These files represent the "Source of Truth" for this project. All code must align with the constraints defined here.

> **WARNING**: Do not deviate from the tech stack or design system without explicit user approval and documentation updates.

> **CAUTION**: Always update 04_TASK_LOG.md after completing tasks to maintain project continuity.

---

**Last Updated**: Initial project setup
