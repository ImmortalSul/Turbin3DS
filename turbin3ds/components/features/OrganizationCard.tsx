"use client";

import { BaseCard } from "@/components/patterns/BaseCard";
import { Button } from "@/components/ui/button";

interface OrganizationCardProps {
  name: string;
  industry: string;
  status: string;
  employeeCount?: number;
  logoUrl?: string;
  onEdit?: () => void;
  onView?: () => void;
}

export function OrganizationCard(props: OrganizationCardProps) {
  const actions = (
    <>
      {props.onView && (
        <Button variant="outline" size="sm" onClick={props.onView}>
          View
        </Button>
      )}
      {props.onEdit && (
        <Button variant="ghost" size="sm" onClick={props.onEdit}>
          Edit
        </Button>
      )}
    </>
  );

  return (
    <BaseCard
      title={props.name}
      subtitle={props.industry}
      status={props.status}
      imageUrl={props.logoUrl}
      className="bg-purple-50/50 border-purple-100"
      actions={actions}
    >
      {props.employeeCount && (
        <p className="text-sm text-muted-foreground mt-1">
          {props.employeeCount} employees
        </p>
      )}
    </BaseCard>
  );
}
