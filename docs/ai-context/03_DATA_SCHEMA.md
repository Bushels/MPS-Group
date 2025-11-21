# Data Schema - Supabase Structure

## STATUS: NOT YET IMPLEMENTED

> **NOTE**: This file is a placeholder for future Supabase database schema. The schema will be defined when backend integration begins.

---

## PLANNED TABLES

### PipeVault™ - Inventory Management

```typescript
interface PipeInventory {
  id: string;                    // UUID
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  
  // Pipe Details
  pipe_size: string;             // e.g., "2-3/8", "4-1/2"
  pipe_grade: string;            // e.g., "J55", "L80"
  pipe_weight: number;           // lbs per foot
  total_joints: number;          // Count of pipe joints
  total_weight: number;          // Total weight in lbs
  
  // Location
  rack_location: string;         // e.g., "A-12", "B-04"
  yard_section: string;          // Physical location in 136 acres
  
  // Ownership
  customer_id: string;           // FK to customers table
  project_reference: string;     // Customer's project ID
  
  // Status
  status: 'stored' | 'reserved' | 'in_transit' | 'delivered';
  storage_start_date: string;    // ISO timestamp
  expected_pickup_date?: string; // ISO timestamp (optional)
  
  // Photos
  photo_urls: string[];          // Array of image URLs
}
```

### JobTracker - Project Management

```typescript
interface Job {
  id: string;                    // UUID
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  
  // Job Details
  job_number: string;            // Internal job reference
  customer_id: string;           // FK to customers table
  job_type: 'fabrication' | 'modular' | 'pipefitting' | 'machining';
  description: string;
  
  // Status
  status: 'quoted' | 'approved' | 'in_progress' | 'qc' | 'completed' | 'invoiced';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  // Dates
  quote_date?: string;
  start_date?: string;
  target_completion_date?: string;
  actual_completion_date?: string;
  
  // Shop Load
  estimated_hours: number;
  actual_hours: number;
  shop_load_percentage: number;  // Calculated field
  
  // Files
  drawing_urls: string[];
  photo_urls: string[];
  qc_document_urls: string[];
}
```

### Customers

```typescript
interface Customer {
  id: string;                    // UUID
  created_at: string;            // ISO timestamp
  updated_at: string;            // ISO timestamp
  
  // Company Details
  company_name: string;
  industry: string;              // e.g., "Oil & Gas", "Construction"
  
  // Primary Contact
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  
  // Address
  address_line1: string;
  address_line2?: string;
  city: string;
  province: string;
  postal_code: string;
  
  // Status
  status: 'active' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}
```

### Users (Supabase Auth Extended)

```typescript
interface UserProfile {
  id: string;                    // FK to auth.users
  created_at: string;
  updated_at: string;
  
  // Profile
  full_name: string;
  role: 'admin' | 'customer' | 'shop_manager' | 'field_tech';
  
  // Customer Association (if role === 'customer')
  customer_id?: string;          // FK to customers table
  
  // Preferences
  email_notifications: boolean;
  sms_notifications: boolean;
}
```

---

## ROW LEVEL SECURITY (RLS) POLICIES

### Customer Access
```sql
-- Customers can only see their own data
CREATE POLICY "Customers see own inventory"
ON pipe_inventory
FOR SELECT
USING (auth.uid() IN (
  SELECT id FROM user_profiles 
  WHERE customer_id = pipe_inventory.customer_id
));
```

### Admin Access
```sql
-- Admins can see everything
CREATE POLICY "Admins see all inventory"
ON pipe_inventory
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);
```

---

## TYPESCRIPT TYPE GENERATION

Once Supabase is set up, generate types using:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > lib/database.types.ts
```

Then import in components:

```typescript
import { Database } from '@/lib/database.types';

type PipeInventory = Database['public']['Tables']['pipe_inventory']['Row'];
type PipeInventoryInsert = Database['public']['Tables']['pipe_inventory']['Insert'];
type PipeInventoryUpdate = Database['public']['Tables']['pipe_inventory']['Update'];
```

---

## STORAGE BUCKETS

### Planned Buckets

1. **pipe-photos**: Storage for pipe inventory images
2. **job-drawings**: CAD files and technical drawings
3. **qc-documents**: Quality control documentation
4. **customer-uploads**: Customer-submitted files

---

## NEXT STEPS

1. Set up Supabase project
2. Create migrations for tables
3. Configure RLS policies
4. Set up storage buckets
5. Generate TypeScript types
6. Create Supabase client utilities

---

**Last Updated**: Initial project setup - Schema not yet implemented
