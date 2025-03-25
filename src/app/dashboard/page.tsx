"use client";

import React from "react";
import { Page as PageComponent } from "@/components/Page";
import { Button } from "@telegram-apps/telegram-ui";
import { logoutAction } from "@/app/login/lib/actions";

const Dashboard = () => {
  return (
    <PageComponent>
      <Button
        onClick={() => {
          logoutAction();
        }}
      >
        logout
      </Button>
    </PageComponent>
  );
};

export default Dashboard;
