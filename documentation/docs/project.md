---
title: Project Documentation
slug: /project
sidebar_label: Project Documentation
---

# Project Documentation

## 1. Abstract

**Bangladesh Cancer Aid Trust (BANCAT)** is a dedicated digital platform engineered to orchestrate cancer patient support, fundraising, and awareness campaigns. This document outlines the technical architecture, information systems, and design methodologies employed in its construction. The system utilizes a distributed "Headless" architecture, ensuring decoupling of the frontend presentation layer from the backend data services.

## 2. System Architecture

The ecosystem conforms to a **3-Tiered Distributed Architecture**, designed for high availability and horizontal scalability.

```mermaid
graph TD
    Client[Client Layer] -->|HTTPS| CDN[Content Delivery Network]
    CDN --> Frontend[Public Portal (React SPAs)]
    CDN --> Admin[Admin Console (React SPAs)]

    subgraph "Application Layer"
        Frontend -->|REST/JSON| API[Laravel API Gateway]
        Admin -->|REST/JSON| API
    end

    subgraph "Data Persistence Layer"
        API --> DB[(Relational Database)]
        API --> Redis[Redis Cache Cluster]
        API --> ObjectStore[File Storage System]
    end
```

### Core Subsystems

| Subsystem | Technology | Responsibility |
| :--- | :--- | :--- |
| **Public Portal** | React 18, Vite | Serves content to donors/visitors; handles client-side routing and hydration. |
| **Admin Console** | React 18, MUI X | Provides CRUD interfaces for internal staff; manages Role-Based Access Control (RBAC). |
| **API Gateway** | Laravel 10 | Orchestrates business logic, authentication (Sanctum), and database transactions. |

## 3. Technology Stack

### Frontend Applications (Public & Admin)
The client-side applications utilize a modern React ecosystem. The component library structure is atomized for reusability.

*   **Core Framework**: React 18 (TypeScript) via Vite Build System.
*   **UI System**: Material UI (MUI) v5 implementing a custom Design Token system.
*   **State Architecture**:
    *   *Server State*: React Query (TanStack Query) v5 for caching and synchronization.
    *   *Global State*: React Context API for themes and authentication.

### Backend Services
The backend is a RESTful API built on **Laravel 10** (PHP 8.2), adhering to SOLID principles.

*   **Authentication**: Laravel Sanctum (Token-based SPA Authentication).
*   **Database**: MySQL/PostgreSQL with Redis Caching.
*   **Endpoints**: All endpoints are versioned (`/api/v1/`) and guarded by Middleware (`auth:sanctum`, `admin` role checks).

## 4. Component Analysis

### Frontend Component Hierarchy (`src/components`)
Analysis of the `frontend/src` directory reveals a modular organization:

*   **Layout**: `Header`, `Footer`, `MegaMenu` (Complex navigation structure).
*   **Composites**:
    *   `PatientCard`: Displays diagnosis, funding goal, and progress bar.
    *   `DonationForm`: Multi-step wizard for processing payments (bKash/Card).
    *   `StoryBlock`: Rich-text renderer for patient narratives.
*   **Shared**: `Button`, `Modal`, `Loader`, `SEO` (Head management).

### Admin Modules (`admin/src/pages`)
The admin panel maps directly to business domains:

*   **CRM Modules**: `Donations`, `Volunteers`, `Partners`.
*   **Content Modules**: `Stories`, `Patients`, `Campaigns`, `Programs`.
*   **System Modules**: `Settings` (SEO, Company Info), `Team` (Staff management).

## 5. API Reference Specification

The API exposes the following primary resource collections under `v1`:

| Resource | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Patients** | `GET` | `/patients` | List active patients with pagination. |
| | `GET` | `/patients/{code}` | Retrieve detailed patient profile by unique code. |
| **Donations** | `POST` | `/donations/initiate` | Start a payment session. |
| | `POST` | `/donations/callback` | Webhook for payment gateway confirmation. |
| **Campaigns** | `GET` | `/campaigns` | List fundraising campaigns. |
| **Volunteers** | `POST` | `/volunteers/apply` | Submit new volunteer application. |
