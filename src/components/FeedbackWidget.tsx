"use client";

import Script from "next/script";

export default function FeedbackWidget({ projectId }: { projectId: string }) {
  return (
    <>
      <Script
        src="feedbackly-widget.vercel.app/widget.umd.js"
        strategy="afterInteractive"
      />
      {/* @ts-expect-error - custom web component */}
      <my-widget project-id={projectId}></my-widget>
    </>
  );
}