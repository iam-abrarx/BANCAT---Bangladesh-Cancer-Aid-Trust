---
title: Admin Panel Guide
slug: /admin
sidebar_label: Admin Panel Guide
---

# Operational Manual: Admin Console

## 1. Introduction
The **BANCAT Admin Console** provides a unified interface for system administrators to oversee platform operations. It incorporates strict Role-Based Access Control (RBAC) to ensure data integrity and security.

**Access Endpoint**: `http://localhost:5174`

## 2. Authentication & Authorization

### Role Hierarchy (RBAC)
The system implements a tiered permission model:

| Role Level | Designation | Scope of Authority |
| :--- | :--- | :--- |
| **L1** | **Super Admin** | **Root Access**: System configuration, Financial oversight, Admin management. |
| **L2** | **Administrator** | **Operational Access**: Patient verification, Donation clearing, Campaign management. |
| **L3** | **Moderator** | **Community Access**: Reviewing volunteer applications, moderating comments. |
| **L4** | **Editor** | **Content Access**: Drafting/Editing stories and blog posts. |

### Standard Credentials (Development Environment)
> ⚠️ **Security Warning**: Default passwords must be rotated immediately upon production deployment.

*   **Super Admin**: `superadmin@bancat.org`
*   **Admin**: `admin@bancat.com`
*   **Default Password**: `password`

## 3. Standard Operating Procedures

### Patient Management Workflow
To onboard a new patient into the system:
1.  Navigate to **Directory > Patients**.
2.  Select **"Registration"** (Plus Icon).
3.  **Data Entry**:
    *   *Demographics*: Name (EN/BN), Age, Location.
    *   *Medical*: Diagnosis, Treatment Center, Doctor's Name.
    *   *Financial*: Total Goal, Current Status (Active/Urgent).
4.  **Media Upload**: Attach high-resolution profile image (Aspect Ratio 1:1 recommended).
5.  **Publishing**: Set status to `Published` to make visible on the frontend.

### Donation Verification Protocol
For manual payments (Bank Transfer/Cash):
1.  Access **Finance > Donations**.
2.  Filter by Status: `Pending`.
3.  Cross-reference the **Transaction ID** with bank statements.
4.  **Action**:
    *   *Match Found*: Mark as `Completed`. (System will auto-update Patient Progress).
    *   *No Match*: Mark as `Failed` or `Flagged`.

### Media Gallery Management
The platform utilizes a centralized media manager:
1.  Navigate to **Content > Gallery**.
2.  Use the **"Bulk Upload"** feature for event photos.
3.  Assign **Tags** (e.g., "Campaign 2024", "Hospital Visit") for frontend filtering.
