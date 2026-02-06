LANDING PAGE

BACKGROUND ANIMATION CODE:

pnpm dlx shadcn@latest add @react-bits/SplashCursor-JS-CSS

\<div style={{ width: '1080px', height: '1080px', position: 'relative' }}\>  
  \<SplashCursor  
    SIM\_RESOLUTION={160}  
    DYE\_RESOLUTION={1440}  
    DENSITY\_DISSIPATION={3.5}  
    VELOCITY\_DISSIPATION={2}  
    PRESSURE={0.1}  
    CURL={3}  
    SPLAT\_RADIUS={0.2}  
    SPLAT\_FORCE={6000}  
    COLOR\_UPDATE\_SPEED={10}  
  /\>  
\</div\>

Background video on download with name gradient

TEXT FOR LANDING PAGE

npm install motion

import BlurText from "./BlurText";

const handleAnimationComplete \= () \=\> {  
  console.log('Animation completed\!');  
};

\<BlurText  
  text="Isn't this so cool?\!"  
  delay={200}  
  animateBy="words"  
  direction="top"  
  onAnimationComplete={handleAnimationComplete}  
  className="text-2xl mb-8"  
/\>

Dashboard

Nav bar

npm install gsap

import PillNav from './PillNav';  
import logo from '/path/to/logo.svg';

\<PillNav  
  logo={logo}  
  logoAlt="Company Logo"  
  items={\[  
    { label: 'Home', href: '/' },  
    { label: 'About', href: '/about' },  
    { label: 'Services', href: '/services' },  
    { label: 'Contact', href: '/contact' }  
  \]}  
  activeHref="/"  
  className="custom-nav"  
  ease="power2.easeOut"  
  baseColor="\#000000"  
  pillColor="\#ffffff"  
  hoveredPillTextColor="\#ffffff"  
  pillTextColor="\#000000"  
  theme="color"  
  initialLoadAnimation  
/\>

Rules dialog

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
dialog.tsx  
'use client';

import \* as React from 'react';  
import \* as DialogPrimitive from '@radix-ui/react-dialog';  
import { XIcon } from 'lucide-react';  
import { cn } from '@/lib/utils';

function Dialog({  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Root\>) {  
	return \<DialogPrimitive.Root data-slot="dialog" {...props} /\>;  
}

function DialogTrigger({  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Trigger\>) {  
	return \<DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} /\>;  
}

function DialogPortal({  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Portal\>) {  
	return \<DialogPrimitive.Portal data-slot="dialog-portal" {...props} /\>;  
}

function DialogClose({  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Close\>) {  
	return \<DialogPrimitive.Close data-slot="dialog-close" {...props} /\>;  
}

function DialogOverlay({  
	className,  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Overlay\>) {  
	return (  
		\<DialogPrimitive.Overlay  
			data-slot="dialog-overlay"  
			className={cn(  
				'data-\[state=open\]:animate-in data-\[state=closed\]:animate-out data-\[state=closed\]:fade-out-0 data-\[state=open\]:fade-in-0 bg-background/50 fixed inset-0 z-50 backdrop-blur',  
				className,  
			)}  
			{...props}  
		/\>  
	);  
}

function DialogContent({  
	className,  
	children,  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Content\>) {  
	return (  
		\<DialogPortal data-slot="dialog-portal"\>  
			\<DialogOverlay /\>  
			\<DialogPrimitive.Content  
				data-slot="dialog-content"  
				className={cn(  
					'bg-background data-\[state=open\]:animate-in data-\[state=closed\]:animate-out data-\[state=closed\]:fade-out-0 data-\[state=open\]:fade-in-0 data-\[state=closed\]:zoom-out-95 data-\[state=open\]:zoom-in-95 fixed top-\[50%\] left-\[50%\] z-50 w-full max-w-\[calc(100%-2rem)\] translate-x-\[-50%\] translate-y-\[-50%\] rounded-lg border shadow-lg duration-200 sm:max-w-lg',  
					className,  
				)}  
				{...props}  
			\>  
				{children}  
			\</DialogPrimitive.Content\>  
		\</DialogPortal\>  
	);  
}

function DialogBody({ className, ...props }: React.ComponentProps\<'div'\>) {  
	return (  
		\<div  
			data-slot="dialog-body"  
			className={cn('px-4 py-6', className)}  
			{...props}  
		/\>  
	);  
}

function DialogHeader({  
	className,  
	children,  
	hideCloseButton \= false,  
	...props  
}: React.ComponentProps\<'div'\> & { hideCloseButton?: boolean }) {  
	return (  
		\<div  
			data-slot="dialog-header"  
			className={cn(  
				'bg-muted/30 flex flex-col gap-2 rounded-t-lg border-b p-4 text-center sm:text-left',  
				className,  
			)}  
			{...props}  
		\>  
			{children}  
			{\!hideCloseButton && (  
				\<DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-\[state=open\]:bg-accent data-\[state=open\]:text-muted-foreground absolute top-4 right-4 rounded-full opacity-80 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none \[&\_svg\]:pointer-events-none \[&\_svg\]:shrink-0 \[&\_svg:not(\[class\*='size-'\])\]:size-4"\>  
					\<XIcon /\>  
					\<span className="sr-only"\>Close\</span\>  
				\</DialogPrimitive.Close\>  
			)}  
		\</div\>  
	);  
}

function DialogFooter({ className, ...props }: React.ComponentProps\<'div'\>) {  
	return (  
		\<div  
			data-slot="dialog-footer"  
			className={cn(  
				'bg-muted/30 flex flex-col gap-2 rounded-b-lg border-t px-4 py-3 sm:flex-row sm:justify-end',  
				className,  
			)}  
			{...props}  
		/\>  
	);  
}

function DialogTitle({  
	className,  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Title\>) {  
	return (  
		\<DialogPrimitive.Title  
			data-slot="dialog-title"  
			className={cn('font-heading text-lg leading-none font-medium', className)}  
			{...props}  
		/\>  
	);  
}

function DialogDescription({  
	className,  
	...props  
}: React.ComponentProps\<typeof DialogPrimitive.Description\>) {  
	return (  
		\<DialogPrimitive.Description  
			data-slot="dialog-description"  
			className={cn('text-muted-foreground text-sm', className)}  
			{...props}  
		/\>  
	);  
}

export {  
	Dialog,  
	DialogClose,  
	DialogContent,  
	DialogBody,  
	DialogDescription,  
	DialogFooter,  
	DialogHeader,  
	DialogOverlay,  
	DialogPortal,  
	DialogTitle,  
	DialogTrigger,  
};

demo.tsx  
import React from 'react';  
import {  
	Dialog,  
	DialogBody,  
	DialogClose,  
	DialogContent,  
	DialogDescription,  
	DialogFooter,  
	DialogHeader,  
	DialogTitle,  
	DialogTrigger,  
} from '@/components/ui/dialog';  
import { Button } from '@/components/ui/button';

export default function Default() {  
	return (  
		\<Dialog\>  
			\<DialogTrigger asChild\>  
				\<Button variant="outline"\>Hello there\!\</Button\>  
			\</DialogTrigger\>  
			\<DialogContent\>  
				\<DialogHeader\>  
					\<DialogTitle\>Hello there\!\</DialogTitle\>  
					\<DialogDescription\>This is a basic message.\</DialogDescription\>  
				\</DialogHeader\>  
				\<DialogBody\>  
					\<p\>This is a simple dialog without a form.\</p\>  
				\</DialogBody\>  
				\<DialogFooter\>  
					\<DialogClose asChild\>  
						\<Button variant="outline"\>Close\</Button\>  
					\</DialogClose\>  
					\<Button\>Okay\</Button\>  
				\</DialogFooter\>  
			\</DialogContent\>  
		\</Dialog\>  
	);  
}

\`\`\`

Copy-paste these files for dependencies:  
\`\`\`tsx  
originui/button  
import { Slot } from "@radix-ui/react-slot";  
import { cva, type VariantProps } from "class-variance-authority";  
import \* as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants \= cva(  
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 \[&\_svg\]:pointer-events-none \[&\_svg\]:shrink-0",  
  {  
    variants: {  
      variant: {  
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",  
        destructive:  
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",  
        outline:  
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",  
        secondary:  
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",  
        ghost: "hover:bg-accent hover:text-accent-foreground",  
        link: "text-primary underline-offset-4 hover:underline",  
      },  
      size: {  
        default: "h-9 px-4 py-2",  
        sm: "h-8 rounded-lg px-3 text-xs",  
        lg: "h-10 rounded-lg px-8",  
        icon: "h-9 w-9",  
      },  
    },  
    defaultVariants: {  
      variant: "default",  
      size: "default",  
    },  
  },  
);

export interface ButtonProps  
  extends React.ButtonHTMLAttributes\<HTMLButtonElement\>,  
    VariantProps\<typeof buttonVariants\> {  
  asChild?: boolean;  
}

const Button \= React.forwardRef\<HTMLButtonElement, ButtonProps\>(  
  ({ className, variant, size, asChild \= false, ...props }, ref) \=\> {  
    const Comp \= asChild ? Slot : "button";  
    return (  
      \<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} /\>  
    );  
  },  
);  
Button.displayName \= "Button";

export { Button, buttonVariants };

\`\`\`  
\`\`\`tsx  
shadcn/switch  
"use client"

import \* as React from "react"  
import \* as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch \= React.forwardRef\<  
  React.ElementRef\<typeof SwitchPrimitives.Root\>,  
  React.ComponentPropsWithoutRef\<typeof SwitchPrimitives.Root\>  
\>(({ className, ...props }, ref) \=\> (  
  \<SwitchPrimitives.Root  
    className={cn(  
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-\[state=checked\]:bg-primary data-\[state=unchecked\]:bg-input",  
      className,  
    )}  
    {...props}  
    ref={ref}  
  \>  
    \<SwitchPrimitives.Thumb  
      className={cn(  
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-\[state=checked\]:translate-x-5 data-\[state=unchecked\]:translate-x-0",  
      )}  
    /\>  
  \</SwitchPrimitives.Root\>  
))  
Switch.displayName \= SwitchPrimitives.Root.displayName

export { Switch }

\`\`\`  
\`\`\`tsx  
shadcn/label  
"use client"

import \* as React from "react"  
import \* as LabelPrimitive from "@radix-ui/react-label"  
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants \= cva(  
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",  
)

const Label \= React.forwardRef\<  
  React.ElementRef\<typeof LabelPrimitive.Root\>,  
  React.ComponentPropsWithoutRef\<typeof LabelPrimitive.Root\> &  
    VariantProps\<typeof labelVariants\>  
\>(({ className, ...props }, ref) \=\> (  
  \<LabelPrimitive.Root  
    ref={ref}  
    className={cn(labelVariants(), className)}  
    {...props}  
  /\>  
))  
Label.displayName \= LabelPrimitive.Root.displayName

export { Label }

\`\`\`  
\`\`\`tsx  
shadcn/input  
import \* as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps  
  extends React.InputHTMLAttributes\<HTMLInputElement\> {}

const Input \= React.forwardRef\<HTMLInputElement, InputProps\>(  
  ({ className, type, ...props }, ref) \=\> {  
    return (  
      \<input  
        type={type}  
        className={cn(  
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",  
          className  
        )}  
        ref={ref}  
        {...props}  
      /\>  
    )  
  }  
)  
Input.displayName \= "Input"

export { Input }

\`\`\`

Install NPM dependencies:  
\`\`\`bash  
lucide-react, @radix-ui/react-dialog, @radix-ui/react-slot, class-variance-authority, @radix-ui/react-switch, @radix-ui/react-label  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

Buttons:

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
star-button.tsx  
"use client";

import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";  
import { cn } from "@/lib/utils";

interface StarBackgroundProps {  
  color?: string;  
}

function StarBackground({ color }: StarBackgroundProps) {  
  return (  
    \<svg  
      width="100%"  
      height="100%"  
      preserveAspectRatio="none"  
      viewBox="0 0 100 40"  
      fill="none"  
      xmlns="http://www.w3.org/2000/svg"  
    \>  
      \<g clipPath="url(\#clip0\_408\_119)"\>  
        \<path  
          d="M32.34 26.68C32.34 26.3152 32.0445 26.02 31.68 26.02C31.3155 26.02 31.02 26.3152 31.02 26.68C31.02 27.0448 31.3155 27.34 31.68 27.34C32.0445 27.34 32.34 27.0448 32.34 26.68Z"  
          fill="black"  
        /\>  
        \<path  
          fillRule="evenodd"  
          clipRule="evenodd"  
          d="M56.1 3.96C56.4645 3.96 56.76 4.25519 56.76 4.62C56.76 4.98481 56.4645 5.28 56.1 5.28C55.9131 5.28 55.7443 5.20201 55.624 5.07762C55.5632 5.01446 55.5147 4.93904 55.4829 4.8559C55.4552 4.78243 55.44 4.70315 55.44 4.62C55.44 4.5549 55.4494 4.49174 55.4668 4.43244C55.4906 4.35188 55.5292 4.27775 55.5795 4.21329C55.7004 4.05926 55.8885 3.96 56.1 3.96ZM40.26 17.16C40.6245 17.16 40.92 17.4552 40.92 17.82C40.92 18.1848 40.6245 18.48 40.26 18.48C39.8955 18.48 39.6 18.1848 39.6 17.82C39.6 17.4552 39.8955 17.16 40.26 17.16ZM74.58 5.28C74.7701 5.28 74.9413 5.36057 75.0618 5.48882C75.073 5.50043 75.0837 5.51268 75.094 5.52557C75.1088 5.54426 75.1231 5.56359 75.1359 5.58357L75.1479 5.60291L75.1595 5.62353C75.1711 5.64481 75.1814 5.66672 75.1906 5.68928C75.2226 5.76662 75.24 5.85106 75.24 5.94C75.24 6.1585 75.1336 6.3525 74.9699 6.47238C74.9158 6.51234 74.8555 6.54393 74.7908 6.56584C74.7247 6.58775 74.6538 6.6 74.58 6.6C74.2156 6.6 73.92 6.30481 73.92 5.94C73.92 5.87684 73.929 5.8156 73.9455 5.7576C73.9596 5.70862 73.979 5.66221 74.0032 5.61903C74.0657 5.50688 74.1595 5.41471 74.2728 5.35541C74.3647 5.30707 74.4691 5.28 74.58 5.28ZM21.66 33.52C22.0245 33.52 22.32 33.8152 22.32 34.18C22.32 34.5448 22.0245 34.84 21.66 34.84C21.2955 34.84 21 34.5448 21 34.18C21 33.8152 21.2955 33.52 21.66 33.52ZM8.16 32.86C8.16 32.4952 7.8645 32.2 7.5 32.2C7.1355 32.2 6.84 32.4952 6.84 32.86C6.84 33.2248 7.1355 33.52 7.5 33.52C7.8645 33.52 8.16 33.2248 8.16 32.86ZM7.5 23.68C7.8645 23.68 8.16 23.9752 8.16 24.34C8.16 24.7048 7.8645 25 7.5 25C7.1355 25 6.84 24.7048 6.84 24.34C6.84 23.9752 7.1355 23.68 7.5 23.68ZM19.32 18.48C19.32 18.1152 19.0245 17.82 18.66 17.82C18.2955 17.82 18 18.1152 18 18.48C18 18.8448 18.2955 19.14 18.66 19.14C19.0245 19.14 19.32 18.8448 19.32 18.48ZM5.66 11.84C6.0245 11.84 6.32001 12.1352 6.32001 12.5C6.32001 12.8648 6.0245 13.16 5.66 13.16C5.2955 13.16 5 12.8648 5 12.5C5 12.1352 5.2955 11.84 5.66 11.84ZM35.16 35.5C35.16 35.1352 34.8645 34.84 34.5 34.84C34.1355 34.84 33.84 35.1352 33.84 35.5C33.84 35.8648 34.1355 36.16 34.5 36.16C34.8645 36.16 35.16 35.8648 35.16 35.5ZM53.5 36.18C53.8645 36.18 54.16 36.4752 54.16 36.84C54.16 37.2048 53.8645 37.5 53.5 37.5C53.1355 37.5 52.84 37.2048 52.84 36.84C52.84 36.4752 53.1355 36.18 53.5 36.18ZM48.5 28.66C48.5 28.2952 48.2045 28 47.84 28C47.4755 28 47.18 28.2952 47.18 28.66C47.18 29.0248 47.4755 29.32 47.84 29.32C48.2045 29.32 48.5 29.0248 48.5 28.66ZM60.34 27.34C60.7045 27.34 61 27.6352 61 28C61 28.3648 60.7045 28.66 60.34 28.66C59.9755 28.66 59.68 28.3648 59.68 28C59.68 27.6352 59.9755 27.34 60.34 27.34ZM56.284 16.5C56.284 16.1352 55.9885 15.84 55.624 15.84C55.2595 15.84 54.964 16.1352 54.964 16.5C54.964 16.8648 55.2595 17.16 55.624 17.16C55.9885 17.16 56.284 16.8648 56.284 16.5ZM46.2 7.26C46.2 6.89519 45.9045 6.6 45.54 6.6C45.5174 6.6 45.4953 6.60129 45.4733 6.60387L45.453 6.60579L45.4124 6.61225L45.3857 6.61804L45.3845 6.61836C45.3675 6.62277 45.3504 6.62721 45.3341 6.63287C45.2522 6.65929 45.1774 6.70184 45.1134 6.75597C45.0627 6.79916 45.0186 6.84943 44.9828 6.90551C44.9178 7.00799 44.88 7.12981 44.88 7.26C44.88 7.62481 45.1755 7.92 45.54 7.92C45.7372 7.92 45.9141 7.83363 46.0353 7.69635C46.0808 7.64478 46.1182 7.58613 46.1459 7.52232C46.1807 7.4424 46.2 7.35346 46.2 7.26ZM33 9.34C33 8.9752 32.7045 8.68 32.34 8.68C31.9755 8.68 31.68 8.9752 31.68 9.34C31.68 9.7048 31.9755 10 32.34 10C32.7045 10 33 9.7048 33 9.34ZM16 4.8559C16.3645 4.8559 16.66 5.1511 16.66 5.5159C16.66 5.8807 16.3645 6.1759 16 6.1759C15.6355 6.1759 15.34 5.8807 15.34 5.5159C15.34 5.1511 15.6355 4.8559 16 4.8559ZM69.66 21.16C69.66 20.7952 69.3645 20.5 69 20.5C68.6355 20.5 68.34 20.7952 68.34 21.16C68.34 21.5248 68.6355 21.82 69 21.82C69.3645 21.82 69.66 21.5248 69.66 21.16ZM80.52 15.18C80.52 14.8152 80.2245 14.52 79.86 14.52C79.4956 14.52 79.2 14.8152 79.2 15.18C79.2 15.5448 79.4956 15.84 79.86 15.84C80.2245 15.84 80.52 15.5448 80.52 15.18ZM78.16 34.84C78.16 34.4752 77.5 34.18 77.5 34.18C77.5 34.18 76.84 34.4752 76.84 34.84C76.84 35.2048 77.1355 35.5 77.5 35.5C77.8645 35.5 78.16 35.2048 78.16 34.84ZM85.66 24.34C86.0245 24.34 86.32 24.6352 86.32 25C86.32 25.3648 86.0245 25.66 85.66 25.66C85.2955 25.66 85 25.3648 85 25C85 24.6352 85.2955 24.34 85.66 24.34ZM91.32 10C91.32 9.6352 91.0245 9.34 90.66 9.34C90.2955 9.34 90 9.6352 90 10C90 10.3648 90.2955 10.66 90.66 10.66C91.0245 10.66 91.32 10.3648 91.32 10ZM138.6 0H0V46.2H138.6V0ZM92.64 34.84C92.64 34.4752 91.98 34.18 91.98 34.18C91.98 34.18 91.32 34.4752 91.32 34.84C91.32 35.2048 91.6155 35.5 91.98 35.5C92.3445 35.5 92.64 35.2048 92.64 34.84Z"  
          fill={color || "currentColor"}  
        /\>  
      \</g\>  
      \<defs\>  
        \<clipPath id="clip0\_408\_119"\>  
          \<rect width="100" height="40" fill="white" /\>  
        \</clipPath\>  
      \</defs\>  
    \</svg\>  
  );  
}

interface StarButtonProps {  
  children: ReactNode;  
  lightWidth?: number;  
  duration?: number;  
  lightColor?: string;  
  backgroundColor?: string;  
  borderWidth?: number;  
  className?: string;  
}

export function StarButton({  
  children,  
  lightWidth \= 110,  
  duration \= 3,  
  lightColor \= "\#FAFAFA",  
  backgroundColor \= "currentColor",  
  borderWidth \= 2,  
  className,  
  ...props  
}: StarButtonProps) {  
  const pathRef \= useRef\<HTMLButtonElement\>(null);

  useEffect(() \=\> {  
    if (pathRef.current) {  
      const div \= pathRef.current;  
      div.style.setProperty(  
        "--path",  
        \`path('M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0')\`,  
      );  
    }  
  }, \[\]);

  return (  
    \<button  
      style={  
        {  
          "--duration": duration,  
          "--light-width": \`${lightWidth}px\`,  
          "--light-color": lightColor,  
          "--border-width": \`${borderWidth}px\`,  
          isolation: "isolate",  
        } as CSSProperties  
      }  
      ref={pathRef}  
      className={cn(  
        "relative z-\[3\] overflow-hidden h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 group/star-button",  
        className,  
      )}  
      {...props}  
    \>  
      \<div  
        className="absolute aspect-square inset-0 animate-star-btn bg-\[radial-gradient(ellipse\_at\_center,var(--light-color),transparent,transparent)\]"  
        style={  
          {  
            offsetPath: "var(--path)",  
            offsetDistance: "0%",  
            width: "var(--light-width)",  
          } as CSSProperties  
        }  
      /\>  
      \<div  
        className="absolute inset-0 dark:border-white/15 border-black/10 z-\[4\] overflow-hidden rounded-\[inherit\] dark:text-black text-white"  
        style={{ borderWidth: "var(--border-width)" }}  
        aria-hidden="true"  
      \>  
        \<StarBackground color={backgroundColor} /\>  
      \</div\>  
      \<span className="z-10 relative bg-gradient-to-t dark:from-white dark:to-neutral-500 from-black to-neutral-400 inline-block text-transparent bg-clip-text"\>  
        {children}  
      \</span\>  
    \</button\>  
  );  
}

demo.tsx  
import { StarButton } from "@/components/ui/star-button";  
import { useTheme } from "next-themes";  
import { useState, useEffect } from "react";  
   
export default function StarButtonDemo() {  
  const { theme } \= useTheme();  
  const \[lightColor, setLightColor\] \= useState("\#FAFAFA");  
   
  useEffect(() \=\> {  
    setLightColor(theme \=== "dark" ? "\#FAFAFA" : "\#FF2056");  
  }, \[theme\]);  
   
  return (  
    \<div\>  
      \<StarButton lightColor={lightColor} className="rounded-3xl"\>  
        Button  
      \</StarButton\>  
    \</div\>  
  );  
}  
\`\`\`

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):  
\`\`\`css  
@import "tailwindcss";  
@import "tw-animate-css";

@theme inline {  
  \--animate-star-btn: star-btn calc(var(--duration)\*1s) linear infinite;  
}

@keyframes star-btn {  
  0% {  
    offset-distance: 0%;  
  }  
  100% {  
    offset-distance: 100%;  
  }  
}  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

Sign up page:

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
sign-in-card-2.tsx  
'use client'  
import React, { useState, useEffect } from 'react';  
import Link from 'next/link';  
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';  
import { Mail, Lock,Eye,EyeClosed, ArrowRight } from 'lucide-react';

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps\<"input"\>) {  
  return (  
    \<input  
      type={type}  
      data-slot="input"  
      className={cn(  
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-\[color,box-shadow\] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",  
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-\[3px\]",  
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",  
        className  
      )}  
      {...props}  
    /\>  
  )  
}

export function Component() {  
  const \[showPassword, setShowPassword\] \= useState(false);  
  const \[email, setEmail\] \= useState("");  
  const \[password, setPassword\] \= useState("");  
  const \[isLoading, setIsLoading\] \= useState(false);  
  const \[focusedInput, setFocusedInput\] \= useState(null);  
  const \[rememberMe, setRememberMe\] \= useState(false);  
  const \[mousePosition, setMousePosition\] \= useState({ x: 0, y: 0 });

  // For 3D card effect \- increased rotation range for more pronounced 3D effect  
  const mouseX \= useMotionValue(0);  
  const mouseY \= useMotionValue(0);  
  const rotateX \= useTransform(mouseY, \[-300, 300\], \[10, \-10\]); // Increased from 5/-5 to 10/-10  
  const rotateY \= useTransform(mouseX, \[-300, 300\], \[-10, 10\]); // Increased from \-5/5 to \-10/10

  const handleMouseMove \= (e: React.MouseEvent) \=\> {  
    const rect \= e.currentTarget.getBoundingClientRect();  
    mouseX.set(e.clientX \- rect.left \- rect.width / 2);  
    mouseY.set(e.clientY \- rect.top \- rect.height / 2);  
    setMousePosition({ x: e.clientX, y: e.clientY });  
  };

  const handleMouseLeave \= () \=\> {  
    mouseX.set(0);  
    mouseY.set(0);  
  };

  const handleSubmit \= (event: React.MouseEvent) \=\> {  
    event.preventDefault();  
    setIsLoading(true);  
    setTimeout(() \=\> setIsLoading(false), 2000);  
  };

  return (  
    \<div className="min-h-screen w-screen bg-black relative overflow-hidden flex items-center justify-center"\>  
      {/\* Background gradient effect \- matches the purple OnlyPipe style \*/}  
      \<div className="absolute inset-0 bg-gradient-to-b from-purple-500/40 via-purple-700/50 to-black" /\>  
        
      {/\* Subtle noise texture overlay \*/}  
      \<div className="absolute inset-0 opacity-\[0.03\] mix-blend-soft-light"   
        style={{  
          backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\`,  
          backgroundSize: '200px 200px'  
        }}  
      /\>

      {/\* Top radial glow \*/}  
      \<div className="absolute top-0 left-1/2 transform \-translate-x-1/2 w-\[120vh\] h-\[60vh\] rounded-b-\[50%\] bg-purple-400/20 blur-\[80px\]" /\>  
      \<motion.div   
        className="absolute top-0 left-1/2 transform \-translate-x-1/2 w-\[100vh\] h-\[60vh\] rounded-b-full bg-purple-300/20 blur-\[60px\]"  
        animate={{   
          opacity: \[0.15, 0.3, 0.15\],  
          scale: \[0.98, 1.02, 0.98\]  
        }}  
        transition={{   
          duration: 8,   
          repeat: Infinity,  
          repeatType: "mirror"  
        }}  
      /\>  
      \<motion.div   
        className="absolute bottom-0 left-1/2 transform \-translate-x-1/2 w-\[90vh\] h-\[90vh\] rounded-t-full bg-purple-400/20 blur-\[60px\]"  
        animate={{   
          opacity: \[0.3, 0.5, 0.3\],  
          scale: \[1, 1.1, 1\]  
        }}  
        transition={{   
          duration: 6,   
          repeat: Infinity,  
          repeatType: "mirror",  
          delay: 1  
        }}  
      /\>

      {/\* Animated glow spots \*/}  
      \<div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-\[100px\] animate-pulse opacity-40" /\>  
      \<div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-\[100px\] animate-pulse delay-1000 opacity-40" /\>

      \<motion.div  
        initial={{ opacity: 0, y: 20 }}  
        animate={{ opacity: 1, y: 0 }}  
        transition={{ duration: 0.8 }}  
        className="w-full max-w-sm relative z-10"  
        style={{ perspective: 1500 }}  
      \>  
        \<motion.div  
          className="relative"  
          style={{ rotateX, rotateY }}  
          onMouseMove={handleMouseMove}  
          onMouseLeave={handleMouseLeave}  
          whileHover={{ z: 10 }}  
        \>  
          \<div className="relative group"\>  
            {/\* Card glow effect \- reduced intensity \*/}  
            \<motion.div   
              className="absolute \-inset-\[1px\] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"  
              animate={{  
                boxShadow: \[  
                  "0 0 10px 2px rgba(255,255,255,0.03)",  
                  "0 0 15px 5px rgba(255,255,255,0.05)",  
                  "0 0 10px 2px rgba(255,255,255,0.03)"  
                \],  
                opacity: \[0.2, 0.4, 0.2\]  
              }}  
              transition={{   
                duration: 4,   
                repeat: Infinity,   
                ease: "easeInOut",   
                repeatType: "mirror"   
              }}  
            /\>

              {/\* Traveling light beam effect \- reduced opacity \*/}  
              \<div className="absolute \-inset-\[1px\] rounded-2xl overflow-hidden"\>  
                {/\* Top light beam \- enhanced glow \*/}  
                \<motion.div   
                  className="absolute top-0 left-0 h-\[3px\] w-\[50%\] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"  
                  initial={{ filter: "blur(2px)" }}  
                  animate={{   
                    left: \["-50%", "100%"\],  
                    opacity: \[0.3, 0.7, 0.3\],  
                    filter: \["blur(1px)", "blur(2.5px)", "blur(1px)"\]  
                  }}  
                  transition={{   
                    left: {  
                      duration: 2.5,   
                      ease: "easeInOut",   
                      repeat: Infinity,  
                      repeatDelay: 1  
                    },  
                    opacity: {  
                      duration: 1.2,  
                      repeat: Infinity,  
                      repeatType: "mirror"  
                    },  
                    filter: {  
                      duration: 1.5,  
                      repeat: Infinity,  
                      repeatType: "mirror"  
                    }  
                  }}  
                /\>  
                  
                {/\* Right light beam \- enhanced glow \*/}  
                \<motion.div   
                  className="absolute top-0 right-0 h-\[50%\] w-\[3px\] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"  
                  initial={{ filter: "blur(2px)" }}  
                  animate={{   
                    top: \["-50%", "100%"\],  
                    opacity: \[0.3, 0.7, 0.3\],  
                    filter: \["blur(1px)", "blur(2.5px)", "blur(1px)"\]  
                  }}  
                  transition={{   
                    top: {  
                      duration: 2.5,   
                      ease: "easeInOut",   
                      repeat: Infinity,  
                      repeatDelay: 1,  
                      delay: 0.6  
                    },  
                    opacity: {  
                      duration: 1.2,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 0.6  
                    },  
                    filter: {  
                      duration: 1.5,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 0.6  
                    }  
                  }}  
                /\>  
                  
                {/\* Bottom light beam \- enhanced glow \*/}  
                \<motion.div   
                  className="absolute bottom-0 right-0 h-\[3px\] w-\[50%\] bg-gradient-to-r from-transparent via-white to-transparent opacity-70"  
                  initial={{ filter: "blur(2px)" }}  
                  animate={{   
                    right: \["-50%", "100%"\],  
                    opacity: \[0.3, 0.7, 0.3\],  
                    filter: \["blur(1px)", "blur(2.5px)", "blur(1px)"\]  
                  }}  
                  transition={{   
                    right: {  
                      duration: 2.5,   
                      ease: "easeInOut",   
                      repeat: Infinity,  
                      repeatDelay: 1,  
                      delay: 1.2  
                    },  
                    opacity: {  
                      duration: 1.2,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 1.2  
                    },  
                    filter: {  
                      duration: 1.5,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 1.2  
                    }  
                  }}  
                /\>  
                  
                {/\* Left light beam \- enhanced glow \*/}  
                \<motion.div   
                  className="absolute bottom-0 left-0 h-\[50%\] w-\[3px\] bg-gradient-to-b from-transparent via-white to-transparent opacity-70"  
                  initial={{ filter: "blur(2px)" }}  
                  animate={{   
                    bottom: \["-50%", "100%"\],  
                    opacity: \[0.3, 0.7, 0.3\],  
                    filter: \["blur(1px)", "blur(2.5px)", "blur(1px)"\]  
                  }}  
                  transition={{   
                    bottom: {  
                      duration: 2.5,   
                      ease: "easeInOut",   
                      repeat: Infinity,  
                      repeatDelay: 1,  
                      delay: 1.8  
                    },  
                    opacity: {  
                      duration: 1.2,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 1.8  
                    },  
                    filter: {  
                      duration: 1.5,  
                      repeat: Infinity,  
                      repeatType: "mirror",  
                      delay: 1.8  
                    }  
                  }}  
                /\>  
                  
                {/\* Subtle corner glow spots \- reduced opacity \*/}  
                \<motion.div   
                  className="absolute top-0 left-0 h-\[5px\] w-\[5px\] rounded-full bg-white/40 blur-\[1px\]"  
                  animate={{   
                    opacity: \[0.2, 0.4, 0.2\]   
                  }}  
                  transition={{   
                    duration: 2,   
                    repeat: Infinity,  
                    repeatType: "mirror"  
                  }}  
                /\>  
                \<motion.div   
                  className="absolute top-0 right-0 h-\[8px\] w-\[8px\] rounded-full bg-white/60 blur-\[2px\]"  
                  animate={{   
                    opacity: \[0.2, 0.4, 0.2\]   
                  }}  
                  transition={{   
                    duration: 2.4,   
                    repeat: Infinity,  
                    repeatType: "mirror",  
                    delay: 0.5  
                  }}  
                /\>  
                \<motion.div   
                  className="absolute bottom-0 right-0 h-\[8px\] w-\[8px\] rounded-full bg-white/60 blur-\[2px\]"  
                  animate={{   
                    opacity: \[0.2, 0.4, 0.2\]   
                  }}  
                  transition={{   
                    duration: 2.2,   
                    repeat: Infinity,  
                    repeatType: "mirror",  
                    delay: 1  
                  }}  
                /\>  
                \<motion.div   
                  className="absolute bottom-0 left-0 h-\[5px\] w-\[5px\] rounded-full bg-white/40 blur-\[1px\]"  
                  animate={{   
                    opacity: \[0.2, 0.4, 0.2\]   
                  }}  
                  transition={{   
                    duration: 2.3,   
                    repeat: Infinity,  
                    repeatType: "mirror",  
                    delay: 1.5  
                  }}  
                /\>  
              \</div\>

              {/\* Card border glow \- reduced opacity \*/}  
              \<div className="absolute \-inset-\[0.5px\] rounded-2xl bg-gradient-to-r from-white/3 via-white/7 to-white/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" /\>  
                
              {/\* Glass card background \*/}  
              \<div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/\[0.05\] shadow-2xl overflow-hidden"\>  
                {/\* Subtle card inner patterns \*/}  
                \<div className="absolute inset-0 opacity-\[0.03\]"   
                  style={{  
                    backgroundImage: \`linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)\`,  
                    backgroundSize: '30px 30px'  
                  }}  
                /\>

                {/\* Logo and header \*/}  
                \<div className="text-center space-y-1 mb-5"\>  
                  \<motion.div  
                    initial={{ scale: 0.5, opacity: 0 }}  
                    animate={{ scale: 1, opacity: 1 }}  
                    transition={{ type: "spring", duration: 0.8 }}  
                    className="mx-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden"  
                  \>  
                    {/\* Logo placeholder \- would be an SVG in practice \*/}  
                    {/\* \<\!-- SVG\_LOGO \--\> \*/}  
                    \<span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"\>S\</span\>  
                      
                    {/\* Inner lighting effect \*/}  
                    \<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" /\>  
                  \</motion.div\>

                  \<motion.h1  
                    initial={{ opacity: 0, y: 10 }}  
                    animate={{ opacity: 1, y: 0 }}  
                    transition={{ delay: 0.2 }}  
                    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"  
                  \>  
                    Welcome Back  
                  \</motion.h1\>  
                    
                  \<motion.p  
                    initial={{ opacity: 0 }}  
                    animate={{ opacity: 1 }}  
                    transition={{ delay: 0.3 }}  
                    className="text-white/60 text-xs"  
                  \>  
                    Sign in to continue to StyleMe  
                  \</motion.p\>  
                \</div\>

                {/\* Login form \*/}  
                \<form onSubmit={(e) \=\> { e.preventDefault(); setIsLoading(true); setTimeout(() \=\> setIsLoading(false), 2000); }} className="space-y-4"\>  
                  \<motion.div className="space-y-3"\>  
                    {/\* Email input \*/}  
                    \<motion.div   
                      className={\`relative ${focusedInput \=== "email" ? 'z-10' : ''}\`}  
                      whileFocus={{ scale: 1.02 }}  
                      whileHover={{ scale: 1.01 }}  
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}  
                    \>  
                      \<div className="absolute \-inset-\[0.5px\] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" /\>  
                        
                      \<div className="relative flex items-center overflow-hidden rounded-lg"\>  
                        \<Mail className={\`absolute left-3 w-4 h-4 transition-all duration-300 ${  
                          focusedInput \=== "email" ? 'text-white' : 'text-white/40'  
                        }\`} /\>  
                          
                        \<Input  
                          type="email"  
                          placeholder="Email address"  
                          value={email}  
                          onChange={(e) \=\> setEmail(e.target.value)}  
                          onFocus={() \=\> setFocusedInput("email" as any)}  
                          onBlur={() \=\> setFocusedInput(null)}  
                          className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-3 focus:bg-white/10"  
                        /\>  
                          
                        {/\* Input highlight effect \*/}  
                        {focusedInput \=== "email" && (  
                          \<motion.div   
                            layoutId="input-highlight"  
                            className="absolute inset-0 bg-white/5 \-z-10"  
                            initial={{ opacity: 0 }}  
                            animate={{ opacity: 1 }}  
                            exit={{ opacity: 0 }}  
                            transition={{ duration: 0.2 }}  
                          /\>  
                        )}  
                      \</div\>  
                    \</motion.div\>

                    {/\* Password input \*/}  
                    \<motion.div   
                      className={\`relative ${focusedInput \=== "password" ? 'z-10' : ''}\`}  
                      whileFocus={{ scale: 1.02 }}  
                      whileHover={{ scale: 1.01 }}  
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}  
                    \>  
                      \<div className="absolute \-inset-\[0.5px\] bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" /\>  
                        
                      \<div className="relative flex items-center overflow-hidden rounded-lg"\>  
                        \<Lock className={\`absolute left-3 w-4 h-4 transition-all duration-300 ${  
                          focusedInput \=== "password" ? 'text-white' : 'text-white/40'  
                        }\`} /\>  
                          
                        \<Input  
                          type={showPassword ? "text" : "password"}  
                          placeholder="Password"  
                          value={password}  
                          onChange={(e) \=\> setPassword(e.target.value)}  
                          onFocus={() \=\> setFocusedInput("password" as any)}  
                          onBlur={() \=\> setFocusedInput(null)}  
                          className="w-full bg-white/5 border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 transition-all duration-300 pl-10 pr-10 focus:bg-white/10"  
                        /\>  
                          
                        {/\* Toggle password visibility \*/}  
                        \<div   
                          onClick={() \=\> setShowPassword(\!showPassword)}   
                          className="absolute right-3 cursor-pointer"  
                        \>  
                          {showPassword ? (  
                            \<Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" /\>  
                          ) : (  
                            \<EyeClosed className="w-4 h-4 text-white/40 hover:text-white transition-colors duration-300" /\>  
                          )}  
                        \</div\>  
                          
                        {/\* Input highlight effect \*/}  
                        {focusedInput \=== "password" && (  
                          \<motion.div   
                            layoutId="input-highlight"  
                            className="absolute inset-0 bg-white/5 \-z-10"  
                            initial={{ opacity: 0 }}  
                            animate={{ opacity: 1 }}  
                            exit={{ opacity: 0 }}  
                            transition={{ duration: 0.2 }}  
                          /\>  
                        )}  
                      \</div\>  
                    \</motion.div\>  
                  \</motion.div\>

                  {/\* Remember me & Forgot password \*/}  
                  \<div className="flex items-center justify-between pt-1"\>  
                    \<div className="flex items-center space-x-2"\>  
                      \<div className="relative"\>  
                        \<input  
                          id="remember-me"  
                          name="remember-me"  
                          type="checkbox"  
                          checked={rememberMe}  
                          onChange={() \=\> setRememberMe(\!rememberMe)}  
                          className="appearance-none h-4 w-4 rounded border border-white/20 bg-white/5 checked:bg-white checked:border-white focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"  
                        /\>  
                        {rememberMe && (  
                          \<motion.div   
                            initial={{ opacity: 0, scale: 0.5 }}  
                            animate={{ opacity: 1, scale: 1 }}  
                            className="absolute inset-0 flex items-center justify-center text-black pointer-events-none"  
                          \>  
                            {/\* \<\!-- SVG\_CHECKMARK \--\> \*/}  
                            \<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"\>  
                              \<polyline points="20 6 9 17 4 12"\>\</polyline\>  
                            \</svg\>  
                          \</motion.div\>  
                        )}  
                      \</div\>  
                      \<label htmlFor="remember-me" className="text-xs text-white/60 hover:text-white/80 transition-colors duration-200"\>  
                        Remember me  
                      \</label\>  
                    \</div\>  
                      
                    \<div className="text-xs relative group/link"\>  
                      \<Link href="/forgot-password" className="text-white/60 hover:text-white transition-colors duration-200"\>  
                        Forgot password?  
                      \</Link\>  
                    \</div\>  
                  \</div\>

                  {/\* Sign in button \*/}  
                  \<motion.button  
                    whileHover={{ scale: 1.02 }}  
                    whileTap={{ scale: 0.98 }}  
                    type="submit"  
                    disabled={isLoading}  
                    className="w-full relative group/button mt-5"  
                  \>  
                    {/\* Button glow effect \- reduced intensity \*/}  
                    \<div className="absolute inset-0 bg-white/10 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity duration-300" /\>  
                      
                    \<div className="relative overflow-hidden bg-white text-black font-medium h-10 rounded-lg transition-all duration-300 flex items-center justify-center"\>  
                      {/\* Button background animation \*/}  
                      \<motion.div   
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 \-z-10"  
                        animate={{   
                          x: \['-100%', '100%'\],  
                        }}  
                        transition={{   
                          duration: 1.5,   
                          ease: "easeInOut",   
                          repeat: Infinity,  
                          repeatDelay: 1  
                        }}  
                        style={{   
                          opacity: isLoading ? 1 : 0,  
                          transition: 'opacity 0.3s ease'  
                        }}  
                      /\>  
                        
                      \<AnimatePresence mode="wait"\>  
                        {isLoading ? (  
                          \<motion.div  
                            key="loading"  
                            initial={{ opacity: 0 }}  
                            animate={{ opacity: 1 }}  
                            exit={{ opacity: 0 }}  
                            className="flex items-center justify-center"  
                          \>  
                            \<div className="w-4 h-4 border-2 border-black/70 border-t-transparent rounded-full animate-spin" /\>  
                          \</motion.div\>  
                        ) : (  
                          \<motion.span  
                            key="button-text"  
                            initial={{ opacity: 0 }}  
                            animate={{ opacity: 1 }}  
                            exit={{ opacity: 0 }}  
                            className="flex items-center justify-center gap-1 text-sm font-medium"  
                          \>  
                            Sign In  
                            \<ArrowRight className="w-3 h-3 group-hover/button:translate-x-1 transition-transform duration-300" /\>  
                          \</motion.span\>  
                        )}  
                      \</AnimatePresence\>  
                    \</div\>  
                  \</motion.button\>

                  {/\* Minimal Divider \*/}  
                  \<div className="relative mt-2 mb-5 flex items-center"\>  
                    \<div className="flex-grow border-t border-white/5"\>\</div\>  
                    \<motion.span   
                      className="mx-3 text-xs text-white/40"  
                      initial={{ opacity: 0.7 }}  
                      animate={{ opacity: \[0.7, 0.9, 0.7\] }}  
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}  
                    \>  
                      or  
                    \</motion.span\>  
                    \<div className="flex-grow border-t border-white/5"\>\</div\>  
                  \</div\>

                  {/\* Google Sign In \*/}  
                  \<motion.button  
                    whileHover={{ scale: 1.02 }}  
                    whileTap={{ scale: 0.98 }}  
                    type="button"  
                    className="w-full relative group/google"  
                  \>  
                    \<div className="absolute inset-0 bg-white/5 rounded-lg blur opacity-0 group-hover/google:opacity-70 transition-opacity duration-300" /\>  
                      
                    \<div className="relative overflow-hidden bg-white/5 text-white font-medium h-10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"\>  
                      {/\* \<\!-- SVG\_GOOGLE\_LOGO \--\> \*/}  
                      \<div className="w-4 h-4 flex items-center justify-center text-white/80 group-hover/google:text-white transition-colors duration-300"\>G\</div\>  
                        
                      \<span className="text-white/80 group-hover/google:text-white transition-colors text-xs"\>  
                        Sign in with Google  
                      \</span\>  
                        
                      {/\* Button hover effect \*/}  
                      \<motion.div   
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"  
                        initial={{ x: '-100%' }}  
                        whileHover={{ x: '100%' }}  
                        transition={{   
                          duration: 1,   
                          ease: "easeInOut"  
                        }}  
                      /\>  
                    \</div\>  
                  \</motion.button\>

                {/\* Sign up link \*/}  
                \<motion.p   
                  className="text-center text-xs text-white/60 mt-4"  
                  initial={{ opacity: 0 }}  
                  animate={{ opacity: 1 }}  
                  transition={{ delay: 0.5 }}  
                \>  
                  Don't have an account?{' '}  
                  \<Link   
                    href="/signup"   
                    className="relative inline-block group/signup"  
                  \>  
                    \<span className="relative z-10 text-white group-hover/signup:text-white/70 transition-colors duration-300 font-medium"\>  
                      Sign up  
                    \</span\>  
                    \<span className="absolute bottom-0 left-0 w-0 h-\[1px\] bg-white group-hover/signup:w-full transition-all duration-300" /\>  
                  \</Link\>  
                \</motion.p\>  
              \</form\>  
            \</div\>  
          \</div\>  
        \</motion.div\>  
      \</motion.div\>  
    \</div\>  
  );  
}

demo.tsx  
import { Component } from "@/components/ui/sign-in-card-2";

const DemoOne \= () \=\> {  
  return (  
    \<div className="flex w-full h-screen justify-center items-center"\>  
      \<Component /\>  
    \</div\>  
  );  
};

export { DemoOne };

\`\`\`

Install NPM dependencies:  
\`\`\`bash  
next, lucide-react, framer-motion  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

Cards for events;

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
trail-card.tsx  
// components/ui/trail-card.tsx  
import \* as React from "react";  
import { motion } from "framer-motion";  
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils"; // Your utility for merging class names  
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

// Define the props interface for type safety and reusability  
interface TrailCardProps extends React.HTMLAttributes\<HTMLDivElement\> {  
  imageUrl: string;  
  mapImageUrl: string;  
  title: string;  
  location: string;  
  difficulty: string;  
  creators: string;  
  distance: string;  
  elevation: string;  
  duration: string;  
  onDirectionsClick?: () \=\> void;  
}

// Define stat item component for DRY principle  
const StatItem \= ({ label, value }: { label: string; value: string }) \=\> (  
  \<div className="flex flex-col"\>  
    \<span className="text-sm font-semibold text-foreground"\>{value}\</span\>  
    \<span className="text-xs text-muted-foreground"\>{label}\</span\>  
  \</div\>  
);

const TrailCard \= React.forwardRef\<HTMLDivElement, TrailCardProps\>(  
  (  
    {  
      className,  
      imageUrl,  
      mapImageUrl,  
      title,  
      location,  
      difficulty,  
      creators,  
      distance,  
      elevation,  
      duration,  
      onDirectionsClick,  
      ...props  
    },  
    ref  
  ) \=\> {  
    return (  
      \<motion.div  
        ref={ref}  
        className={cn(  
          "w-full max-w-sm overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg",  
          className  
        )}  
        whileHover={{ y: \-5, scale: 1.02 }} // Subtle lift and scale animation on hover  
        transition={{ type: "spring", stiffness: 300, damping: 20 }}  
        {...props}  
      \>  
        {/\* Top section with background image and content \*/}  
        \<div className="relative h-60 w-full"\>  
          \<img  
            src={imageUrl}  
            alt={title}  
            className="h-full w-full object-cover"  
          /\>  
          \<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /\>  
          \<div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4"\>  
            \<div className="text-white"\>  
              \<h3 className="text-xl font-bold"\>{title}\</h3\>  
              \<p className="text-sm text-white/90"\>{location}\</p\>  
            \</div\>  
            {/\* The button will animate in on hover of the parent card \*/}  
            \<motion.div  
              initial={{ opacity: 0, x: 20 }}  
              whileHover={{ opacity: 1, x: 0 }}  
              animate={{ opacity: 0, x: 20 }} // Kept hidden by default  
              transition={{ duration: 0.3, ease: "easeInOut" }}  
            \>  
              \<Button  
                variant="secondary"  
                onClick={onDirectionsClick}  
                aria-label={\`Get directions to ${title}\`}  
              \>  
                Directions  
                \<ArrowRight className="ml-2 h-4 w-4" /\>  
              \</Button\>  
            \</motion.div\>  
          \</div\>  
        \</div\>

        {/\* Bottom section with trail details \*/}  
        \<div className="p-5"\>  
          \<div className="flex items-center justify-between"\>  
            \<div\>  
              \<p className="font-bold text-foreground"\>{difficulty}\</p\>  
              \<p className="text-xs text-muted-foreground"\>{creators}\</p\>  
            \</div\>  
            {/\* Simple SVG or image representation of the trail map \*/}  
            \<img  
              src={mapImageUrl}  
              alt="Trail map"  
              className="h-10 w-20 object-contain"  
            /\>  
          \</div\>  
          \<div className="my-4 h-px w-full bg-border" /\>  
          \<div className="flex justify-between"\>  
            \<StatItem label="Distance" value={distance} /\>  
            \<StatItem label="Elevation" value={elevation} /\>  
            \<StatItem label="Duration" value={duration} /\>  
          \</div\>  
        \</div\>  
      \</motion.div\>  
    );  
  }  
);

TrailCard.displayName \= "TrailCard";

export { TrailCard };

demo.tsx  
// demo.tsx  
import { TrailCard } from "@/components/ui/trail-card";

export default function TrailCardDemo() {  
  return (  
    \<div className="flex min-h-screen items-center justify-center bg-background p-4"\>  
      \<TrailCard  
        title="Embercrest Ridge"  
        location="Silverpine Mountains"  
        difficulty="Hard"  
        creators="1886 by Helen Rowe & Elias Mendez"  
        distance="12.4km"  
        elevation="870m"  
        duration="4h 45m"  
        // Using a placeholder image service for demonstration  
        imageUrl="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80\&w=2070\&auto=format\&fit=crop"  
        // A placeholder for the map SVG/image  
        mapImageUrl="https://www.thiings.co/\_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-3JYNLpogg5zknunPABpdOpEjJmZN5R.png\&w=320\&q=75"  
        onDirectionsClick={() \=\> alert("Directions clicked\!")}  
      /\>  
    \</div\>  
  );  
}  
\`\`\`

Copy-paste these files for dependencies:  
\`\`\`tsx  
shadcn/button  
import \* as React from "react"  
import { Slot } from "@radix-ui/react-slot"  
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants \= cva(  
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",  
  {  
    variants: {  
      variant: {  
        default: "bg-primary text-primary-foreground hover:bg-primary/90",  
        destructive:  
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",  
        outline:  
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",  
        secondary:  
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",  
        ghost: "hover:bg-accent hover:text-accent-foreground",  
        link: "text-primary underline-offset-4 hover:underline",  
      },  
      size: {  
        default: "h-10 px-4 py-2",  
        sm: "h-9 rounded-md px-3",  
        lg: "h-11 rounded-md px-8",  
        icon: "h-10 w-10",  
      },  
    },  
    defaultVariants: {  
      variant: "default",  
      size: "default",  
    },  
  },  
)

export interface ButtonProps  
  extends React.ButtonHTMLAttributes\<HTMLButtonElement\>,  
    VariantProps\<typeof buttonVariants\> {  
  asChild?: boolean  
}

const Button \= React.forwardRef\<HTMLButtonElement, ButtonProps\>(  
  ({ className, variant, size, asChild \= false, ...props }, ref) \=\> {  
    const Comp \= asChild ? Slot : "button"  
    return (  
      \<Comp  
        className={cn(buttonVariants({ variant, size, className }))}  
        ref={ref}  
        {...props}  
      /\>  
    )  
  },  
)  
Button.displayName \= "Button"

export { Button, buttonVariants }

\`\`\`

Install NPM dependencies:  
\`\`\`bash  
lucide-react, framer-motion, @radix-ui/react-slot, class-variance-authority  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

Upload file

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
use-image-upload.tsx  
import { useCallback, useEffect, useRef, useState } from "react";

interface UseImageUploadProps {  
  onUpload?: (url: string) \=\> void;  
}

export function useImageUpload({ onUpload }: UseImageUploadProps \= {}) {  
  const previewRef \= useRef\<string | null\>(null);  
  const fileInputRef \= useRef\<HTMLInputElement\>(null);  
  const \[previewUrl, setPreviewUrl\] \= useState\<string | null\>(null);  
  const \[fileName, setFileName\] \= useState\<string | null\>(null);

  const handleThumbnailClick \= useCallback(() \=\> {  
    fileInputRef.current?.click();  
  }, \[\]);

  const handleFileChange \= useCallback(  
    (event: React.ChangeEvent\<HTMLInputElement\>) \=\> {  
      const file \= event.target.files?.\[0\];  
      if (file) {  
        setFileName(file.name);  
        const url \= URL.createObjectURL(file);  
        setPreviewUrl(url);  
        previewRef.current \= url;  
        onUpload?.(url);  
      }  
    },  
    \[onUpload\],  
  );

  const handleRemove \= useCallback(() \=\> {  
    if (previewUrl) {  
      URL.revokeObjectURL(previewUrl);  
    }  
    setPreviewUrl(null);  
    setFileName(null);  
    previewRef.current \= null;  
    if (fileInputRef.current) {  
      fileInputRef.current.value \= "";  
    }  
  }, \[previewUrl\]);

  useEffect(() \=\> {  
    return () \=\> {  
      if (previewRef.current) {  
        URL.revokeObjectURL(previewRef.current);  
      }  
    };  
  }, \[\]);

  return {  
    previewUrl,  
    fileName,  
    fileInputRef,  
    handleThumbnailClick,  
    handleFileChange,  
    handleRemove,  
  };  
}

demo.tsx  
import { Button } from "@/components/ui/button"  
import { Input } from "@/components/ui/input"  
import { useImageUpload } from "@/components/hooks/use-image-upload"  
import { ImagePlus, X, Upload, Trash2 } from "lucide-react"  
import Image from "next/image"  
import { useCallback, useState } from "react"  
import { cn } from "@/lib/utils"

export function ImageUploadDemo() {  
  const {  
    previewUrl,  
    fileName,  
    fileInputRef,  
    handleThumbnailClick,  
    handleFileChange,  
    handleRemove,  
  } \= useImageUpload({  
    onUpload: (url) \=\> console.log("Uploaded image URL:", url),  
  })

  const \[isDragging, setIsDragging\] \= useState(false)

  const handleDragOver \= (e: React.DragEvent\<HTMLDivElement\>) \=\> {  
    e.preventDefault()  
    e.stopPropagation()  
  }

  const handleDragEnter \= (e: React.DragEvent\<HTMLDivElement\>) \=\> {  
    e.preventDefault()  
    e.stopPropagation()  
    setIsDragging(true)  
  }

  const handleDragLeave \= (e: React.DragEvent\<HTMLDivElement\>) \=\> {  
    e.preventDefault()  
    e.stopPropagation()  
    setIsDragging(false)  
  }

  const handleDrop \= useCallback(  
    (e: React.DragEvent\<HTMLDivElement\>) \=\> {  
      e.preventDefault()  
      e.stopPropagation()  
      setIsDragging(false)

      const file \= e.dataTransfer.files?.\[0\]  
      if (file && file.type.startsWith("image/")) {  
        const fakeEvent \= {  
          target: {  
            files: \[file\],  
          },  
        } as React.ChangeEvent\<HTMLInputElement\>  
        handleFileChange(fakeEvent)  
      }  
    },  
    \[handleFileChange\],  
  )

  return (  
    \<div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm"\>  
      \<div className="space-y-2"\>  
        \<h3 className="text-lg font-medium"\>Image Upload\</h3\>  
        \<p className="text-sm text-muted-foreground"\>  
          Supported formats: JPG, PNG, GIF  
        \</p\>  
      \</div\>

      \<Input  
        type="file"  
        accept="image/\*"  
        className="hidden"  
        ref={fileInputRef}  
        onChange={handleFileChange}  
      /\>

      {\!previewUrl ? (  
        \<div  
          onClick={handleThumbnailClick}  
          onDragOver={handleDragOver}  
          onDragEnter={handleDragEnter}  
          onDragLeave={handleDragLeave}  
          onDrop={handleDrop}  
          className={cn(  
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",  
            isDragging && "border-primary/50 bg-primary/5",  
          )}  
        \>  
          \<div className="rounded-full bg-background p-3 shadow-sm"\>  
            \<ImagePlus className="h-6 w-6 text-muted-foreground" /\>  
          \</div\>  
          \<div className="text-center"\>  
            \<p className="text-sm font-medium"\>Click to select\</p\>  
            \<p className="text-xs text-muted-foreground"\>  
              or drag and drop file here  
            \</p\>  
          \</div\>  
        \</div\>  
      ) : (  
        \<div className="relative"\>  
          \<div className="group relative h-64 overflow-hidden rounded-lg border"\>  
            \<Image  
              src={previewUrl}  
              alt="Preview"  
              fill  
              className="object-cover transition-transform duration-300 group-hover:scale-105"  
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
            /\>  
            \<div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" /\>  
            \<div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100"\>  
              \<Button  
                size="sm"  
                variant="secondary"  
                onClick={handleThumbnailClick}  
                className="h-9 w-9 p-0"  
              \>  
                \<Upload className="h-4 w-4" /\>  
              \</Button\>  
              \<Button  
                size="sm"  
                variant="destructive"  
                onClick={handleRemove}  
                className="h-9 w-9 p-0"  
              \>  
                \<Trash2 className="h-4 w-4" /\>  
              \</Button\>  
            \</div\>  
          \</div\>  
          {fileName && (  
            \<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"\>  
              \<span className="truncate"\>{fileName}\</span\>  
              \<button  
                onClick={handleRemove}  
                className="ml-auto rounded-full p-1 hover:bg-muted"  
              \>  
                \<X className="h-4 w-4" /\>  
              \</button\>  
            \</div\>  
          )}  
        \</div\>  
      )}  
    \</div\>  
  )  
}

\`\`\`

Copy-paste these files for dependencies:  
\`\`\`tsx  
originui/button  
import { Slot } from "@radix-ui/react-slot";  
import { cva, type VariantProps } from "class-variance-authority";  
import \* as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants \= cva(  
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 \[&\_svg\]:pointer-events-none \[&\_svg\]:shrink-0",  
  {  
    variants: {  
      variant: {  
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",  
        destructive:  
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",  
        outline:  
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",  
        secondary:  
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",  
        ghost: "hover:bg-accent hover:text-accent-foreground",  
        link: "text-primary underline-offset-4 hover:underline",  
      },  
      size: {  
        default: "h-9 px-4 py-2",  
        sm: "h-8 rounded-lg px-3 text-xs",  
        lg: "h-10 rounded-lg px-8",  
        icon: "h-9 w-9",  
      },  
    },  
    defaultVariants: {  
      variant: "default",  
      size: "default",  
    },  
  },  
);

export interface ButtonProps  
  extends React.ButtonHTMLAttributes\<HTMLButtonElement\>,  
    VariantProps\<typeof buttonVariants\> {  
  asChild?: boolean;  
}

const Button \= React.forwardRef\<HTMLButtonElement, ButtonProps\>(  
  ({ className, variant, size, asChild \= false, ...props }, ref) \=\> {  
    const Comp \= asChild ? Slot : "button";  
    return (  
      \<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} /\>  
    );  
  },  
);  
Button.displayName \= "Button";

export { Button, buttonVariants };

\`\`\`  
\`\`\`tsx  
originui/input  
import { cn } from "@/lib/utils";  
import \* as React from "react";

const Input \= React.forwardRef\<HTMLInputElement, React.ComponentProps\<"input"\>\>(  
  ({ className, type, ...props }, ref) \=\> {  
    return (  
      \<input  
        type={type}  
        className={cn(  
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-\[3px\] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",  
          type \=== "search" &&  
            "\[&::-webkit-search-cancel-button\]:appearance-none \[&::-webkit-search-decoration\]:appearance-none \[&::-webkit-search-results-button\]:appearance-none \[&::-webkit-search-results-decoration\]:appearance-none",  
          type \=== "file" &&  
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",  
          className,  
        )}  
        ref={ref}  
        {...props}  
      /\>  
    );  
  },  
);  
Input.displayName \= "Input";

export { Input };

\`\`\`

Install NPM dependencies:  
\`\`\`bash  
@radix-ui/react-slot, class-variance-authority  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

Input style

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
mail-checker-input.tsx  
"use client"

import { useId, useState } from "react"  
import { Input } from "@/components/ui/input"  
import { Label } from "@/components/ui/label"  
import Image from "next/image"  
import md5 from "md5"

export default function MailCheckInput() {  
  const id \= useId()  
  const \[email, setEmail\] \= useState("")

  // Generate gravatar URL if valid email  
  const getAvatar \= (email: string) \=\> {  
    if (\!email.includes("@")) return null  
    const hash \= md5(email.trim().toLowerCase())  
    return \`https://www.gravatar.com/avatar/${hash}?d=identicon\`  
  }

  const avatarUrl \= getAvatar(email)

  return (  
    \<div className="w-full max-w-md mx-auto space-y-2"\>  
      \<Label  
        htmlFor={id}  
        className="text-sm font-medium text-foreground"  
      \>  
        Enter your email  
      \</Label\>  
      \<div className="relative group"\>  
        {avatarUrl ? (  
          \<Image  
            src={avatarUrl}  
            alt="Avatar"  
            width={24}  
            height={24}  
            className="absolute left-3 top-1/2 \-translate-y-1/2 rounded-full border shadow-sm"  
          /\>  
        ) : (  
          \<div className="absolute left-3 top-1/2 \-translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground"\>  
            ?  
          \</div\>  
        )}  
        \<Input  
          id={id}  
          type="email"  
          value={email}  
          onChange={(e) \=\> setEmail(e.target.value)}  
          placeholder="you@example.com"  
          className="pl-12 h-12 rounded-2xl border border-muted bg-background/80 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/40"  
        /\>  
      \</div\>  
      \<p className="text-xs text-muted-foreground"\>  
        Stay updated with our latest news & articles.  
      \</p\>  
    \</div\>  
  )  
}

demo.tsx  
import MailCheckInput from "@/components/ui/mail-checker-input";

export default function DemoOne() {  
  return \<MailCheckInput /\>;  
}

\`\`\`

Copy-paste these files for dependencies:  
\`\`\`tsx  
originui/input  
import { cn } from "@/lib/utils";  
import \* as React from "react";

const Input \= React.forwardRef\<HTMLInputElement, React.ComponentProps\<"input"\>\>(  
  ({ className, type, ...props }, ref) \=\> {  
    return (  
      \<input  
        type={type}  
        className={cn(  
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-\[3px\] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",  
          type \=== "search" &&  
            "\[&::-webkit-search-cancel-button\]:appearance-none \[&::-webkit-search-decoration\]:appearance-none \[&::-webkit-search-results-button\]:appearance-none \[&::-webkit-search-results-decoration\]:appearance-none",  
          type \=== "file" &&  
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",  
          className,  
        )}  
        ref={ref}  
        {...props}  
      /\>  
    );  
  },  
);  
Input.displayName \= "Input";

export { Input };

\`\`\`  
\`\`\`tsx  
shadcn/label  
"use client"

import \* as React from "react"  
import \* as LabelPrimitive from "@radix-ui/react-label"  
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants \= cva(  
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",  
)

const Label \= React.forwardRef\<  
  React.ElementRef\<typeof LabelPrimitive.Root\>,  
  React.ComponentPropsWithoutRef\<typeof LabelPrimitive.Root\> &  
    VariantProps\<typeof labelVariants\>  
\>(({ className, ...props }, ref) \=\> (  
  \<LabelPrimitive.Root  
    ref={ref}  
    className={cn(labelVariants(), className)}  
    {...props}  
  /\>  
))  
Label.displayName \= LabelPrimitive.Root.displayName

export { Label }

\`\`\`

Install NPM dependencies:  
\`\`\`bash  
md5, next, @radix-ui/react-label, class-variance-authority  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

After payment a customized card with their name

You are given a task to integrate an existing React component in the codebase

The codebase should support:  
\- shadcn project structure    
\- Tailwind CSS  
\- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles.   
If default path for components is not /components/ui, provide instructions on why it's important to create this folder  
Copy-paste this component to /components/ui folder:  
\`\`\`tsx  
material-design-3-ripple.tsx  
import React, {  
  useCallback,  
  useRef,  
  useState,  
  forwardRef,  
  useImperativeHandle,  
} from "react";  
import { cn } from "@/lib/utils";

// \--- 1\. PHYSICS CONSTANTS \---  
// We keep the logic from the button, but make DURATION dynamic  
const MINIMUM\_PRESS\_MS \= 300;  
const INITIAL\_ORIGIN\_SCALE \= 0.2;  
const PADDING \= 10;  
const SOFT\_EDGE\_MINIMUM\_SIZE \= 75;  
const SOFT\_EDGE\_CONTAINER\_RATIO \= 0.35;  
const ANIMATION\_FILL \= "forwards";  
const TOUCH\_DELAY\_MS \= 150;  
const EASING\_STANDARD \= "cubic-bezier(0.2, 0, 0, 1)";

// \--- 2\. TYPES \---  
enum RippleState {  
  INACTIVE,  
  TOUCH\_DELAY,  
  HOLDING,  
  WAITING\_FOR\_CLICK,  
}

interface RippleProps extends React.HTMLAttributes\<HTMLDivElement\> {  
  /\*\*  
   \* Tailwind text color class for the ripple (e.g., "text-white", "text-blue-500").  
   \* Defaults to "text-current" (inherits parent text color).  
   \*/  
  color?: string;  
  /\*\*  
   \* Base opacity when fully pressed. Default: 0.12  
   \*/  
  opacity?: number;  
  disabled?: boolean;  
}

// \--- 3\. THE LOGIC (Converted to be self-contained) \---  
const Ripple \= forwardRef\<HTMLDivElement, RippleProps\>(  
  (  
    {  
      className,  
      children,  
      color \= "text-current",  
      opacity \= 0.12,  
      disabled \= false,  
      style,  
      ...props  
    },  
    ref  
  ) \=\> {  
    const containerRef \= useRef\<HTMLDivElement\>(null);  
    const rippleRef \= useRef\<HTMLDivElement\>(null);  
      
    // Internal State  
    const stateRef \= useRef(RippleState.INACTIVE);  
    const rippleStartEventRef \= useRef\<React.PointerEvent | null\>(null);  
    const growAnimationRef \= useRef\<Animation | null\>(null);  
      
    // Visual State (for opacity transitions)  
    const \[isPressed, setIsPressed\] \= useState(false);  
    const \[isHovered, setIsHovered\] \= useState(false);

    // Determines if we are wrapping content or sitting inside it  
    const isWrapper \= React.Children.count(children) \> 0;

    // \--- GEOMETRY & ANIMATION \---  
    const determineRippleSize \= () \=\> {  
      if (\!containerRef.current) return { size: "0px", scale: 1, duration: 450 };  
        
      const { height, width } \= containerRef.current.getBoundingClientRect();  
      const maxDim \= Math.max(height, width);  
      const softEdgeSize \= Math.max(  
        SOFT\_EDGE\_CONTAINER\_RATIO \* maxDim,  
        SOFT\_EDGE\_MINIMUM\_SIZE  
      );

      const initialSize \= Math.floor(maxDim \* INITIAL\_ORIGIN\_SCALE);  
      const hypotenuse \= Math.sqrt(width \*\* 2 \+ height \*\* 2);  
      const maxRadius \= hypotenuse \+ PADDING;

      // DYNAMIC SPEED CALCULATION  
      // Standard button (\~200px) gets \~450ms. Large cards get slower.  
      // We clamp it between 400ms (fastest) and 1000ms (slowest)  
      const dynamicDuration \= Math.min(Math.max(400, hypotenuse \* 1.5), 1000);

      const rippleScale \= (maxRadius \+ softEdgeSize) / initialSize;

      return {  
        size: \`${initialSize}px\`,  
        scale: rippleScale,  
        duration: dynamicDuration  
      };  
    };

    const getTranslationCoordinates \= (event?: React.PointerEvent) \=\> {  
      if (\!containerRef.current) return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };  
      const { height, width, left, top } \= containerRef.current.getBoundingClientRect();  
        
      // We need the initial size again for centering  
      const maxDim \= Math.max(height, width);  
      const initialSize \= Math.floor(maxDim \* INITIAL\_ORIGIN\_SCALE);

      const endPoint \= {  
        x: (width \- initialSize) / 2,  
        y: (height \- initialSize) / 2,  
      };

      let startPoint;  
      if (event) {  
        startPoint \= {  
          x: event.clientX \- left,  
          y: event.clientY \- top,  
        };  
      } else {  
        startPoint \= {  
          x: width / 2,  
          y: height / 2,  
        };  
      }

      startPoint \= {  
        x: startPoint.x \- initialSize / 2,  
        y: startPoint.y \- initialSize / 2,  
      };

      return { startPoint, endPoint };  
    };

    const startPressAnimation \= (event?: React.PointerEvent) \=\> {  
      setIsPressed(true);  
      if (\!rippleRef.current) return;

      growAnimationRef.current?.cancel();  
        
      const { size, scale, duration } \= determineRippleSize();  
      const { startPoint, endPoint } \= getTranslationCoordinates(event);

      // Apply initial size immediately  
      rippleRef.current.style.width \= size;  
      rippleRef.current.style.height \= size;

      growAnimationRef.current \= rippleRef.current.animate(  
        {  
          top: \[0, 0\],  
          left: \[0, 0\],  
          transform: \[  
            \`translate(${startPoint.x}px, ${startPoint.y}px) scale(1)\`,  
            \`translate(${endPoint.x}px, ${endPoint.y}px) scale(${scale})\`,  
          \],  
        },  
        {  
          duration: duration, // DYNAMIC DURATION  
          easing: EASING\_STANDARD,  
          fill: ANIMATION\_FILL,  
        }  
      );  
    };

    const endPressAnimation \= async () \=\> {  
      rippleStartEventRef.current \= null;  
      stateRef.current \= RippleState.INACTIVE;  
        
      const animation \= growAnimationRef.current;  
      let pressAnimationPlayState \= Infinity;  
        
      if (animation && typeof animation.currentTime \=== 'number') {  
          pressAnimationPlayState \= animation.currentTime;  
      }

      if (pressAnimationPlayState \< MINIMUM\_PRESS\_MS) {  
        await new Promise((resolve) \=\> {  
          setTimeout(resolve, MINIMUM\_PRESS\_MS \- pressAnimationPlayState);  
        });  
      }

      if (growAnimationRef.current \!== animation) {  
        return;  
      }

      setIsPressed(false);  
    };

    // \--- EVENT HANDLERS \---  
    const isTouch \= (event: React.PointerEvent) \=\> event.pointerType \=== "touch";

    const shouldReactToEvent \= (event: React.PointerEvent) \=\> {  
      if (disabled || \!event.isPrimary) return false;  
      if (rippleStartEventRef.current && rippleStartEventRef.current.pointerId \!== event.pointerId) {  
        return false;  
      }  
      if (event.type \=== "pointerenter" || event.type \=== "pointerleave") {  
        return \!isTouch(event);  
      }  
      const isPrimaryButton \= event.buttons \=== 1;  
      return isTouch(event) || isPrimaryButton;  
    };

    const handlePointerDown \= async (event: React.PointerEvent\<HTMLDivElement\>) \=\> {  
      if (\!shouldReactToEvent(event)) return;  
      rippleStartEventRef.current \= event;

      if (\!isTouch(event)) {  
        stateRef.current \= RippleState.WAITING\_FOR\_CLICK;  
        startPressAnimation(event);  
        return;  
      }

      stateRef.current \= RippleState.TOUCH\_DELAY;  
      await new Promise((resolve) \=\> setTimeout(resolve, TOUCH\_DELAY\_MS));

      if (stateRef.current \!== RippleState.TOUCH\_DELAY) {  
        return;  
      }

      stateRef.current \= RippleState.HOLDING;  
      startPressAnimation(event);  
    };

    const handlePointerUp \= (event: React.PointerEvent\<HTMLDivElement\>) \=\> {  
      if (\!shouldReactToEvent(event)) return;  
      if (stateRef.current \=== RippleState.HOLDING) {  
        stateRef.current \= RippleState.WAITING\_FOR\_CLICK;  
        return;  
      }  
      if (stateRef.current \=== RippleState.TOUCH\_DELAY) {  
        stateRef.current \= RippleState.WAITING\_FOR\_CLICK;  
        startPressAnimation(rippleStartEventRef.current || undefined);  
        return;  
      }  
    };

    const handlePointerLeave \= (event: React.PointerEvent\<HTMLDivElement\>) \=\> {  
      if (\!shouldReactToEvent(event)) return;  
      setIsHovered(false);  
      if (stateRef.current \!== RippleState.INACTIVE) {  
          endPressAnimation();  
      }  
    };

    const handlePointerEnter \= (event: React.PointerEvent\<HTMLDivElement\>) \=\> {  
        if (\!shouldReactToEvent(event)) return;  
        setIsHovered(true);  
    }

    const handleClick \= () \=\> {  
      if (disabled) return;  
      if (stateRef.current \=== RippleState.WAITING\_FOR\_CLICK) {  
          endPressAnimation();  
          return;  
      }  
      if (stateRef.current \=== RippleState.INACTIVE) {  
          startPressAnimation();  
          endPressAnimation();  
      }  
    };

    // Forward ref to container  
    useImperativeHandle(ref, () \=\> containerRef.current as HTMLDivElement);

    return (  
      \<div  
        ref={containerRef}  
        className={cn(  
          // 1\. Layout Mode: Relative (Wrapper) or Absolute (Overlay)  
          isWrapper ? "relative" : "absolute inset-0",  
          // 2\. Base Styles  
          "overflow-hidden isolate z-0 rounded-\[inherit\]",  
          color, // Apply text color for currentcolor inheritance  
          className  
        )}  
        style={style}  
        // Event Binding  
        onPointerDown={handlePointerDown}  
        onPointerUp={handlePointerUp}  
        onPointerEnter={handlePointerEnter}  
        onPointerLeave={handlePointerLeave}  
        onClick={handleClick}  
        {...props}  
      \>  
        {/\* Child Content (if any) \*/}  
        {children && (  
            \<div className="relative z-10 pointer-events-none"\>  
                {children}  
            \</div\>  
        )}

        {/\* \--- RIPPLE LAYERS \--- \*/}  
        \<div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true"\>  
            {/\* 1\. State Layer (Hover) \*/}  
            \<div   
                className={cn(  
                    "absolute inset-0 bg-current transition-opacity duration-200 ease-linear",  
                    isHovered ? "opacity-\[0.08\]" : "opacity-0"  
                )}   
            /\>  
              
            {/\* 2\. Ripple Effect (Press) \*/}  
            \<div   
                ref={rippleRef}  
                className="absolute rounded-full opacity-0 bg-current"  
                style={{  
                    // Exact Gradient from Material Button  
                    background: "radial-gradient(closest-side, currentColor max(calc(100% \- 70px), 65%), transparent 100%)",  
                    transition: "opacity 375ms linear",  
                    opacity: isPressed ? opacity : "0",  
                    transitionDuration: isPressed ? "105ms" : "375ms"  
                }}  
            /\>  
        \</div\>  
      \</div\>  
    );  
  }  
);

Ripple.displayName \= "Ripple";

export { Ripple };

demo.tsx  
import React, { useState } from "react";  
import { Ripple } from "@/components/ui/material-design-3-ripple";  
import { Fingerprint, Lock, Unlock, ChevronRight } from "lucide-react";

export default function SpotlightRippleDemo() {  
  const \[unlocked, setUnlocked\] \= useState(false);

  return (  
    \<div className="relative min-h-\[600px\] h-screen w-full flex items-center justify-center bg-\[\#09090b\] overflow-hidden font-sans selection:bg-indigo-500/30"\>  
        
      {/\* 1\. DOTTED BACKGROUND \*/}  
      {/\* We create a pattern using radial gradients \*/}  
      \<div className="absolute inset-0 z-0 h-full w-full bg-\[radial-gradient(\#27272a\_1px,transparent\_1px)\] \[background-size:16px\_16px\] \[mask-image:radial-gradient(ellipse\_50%\_50%\_at\_50%\_50%,\#000\_70%,transparent\_100%)\]" /\>

      {/\* 2\. SHINY SPOTLIGHT EFFECT \*/}  
      {/\* A massive gradient glow from the top to simulate a light source \*/}  
      \<div className="absolute top-0 left-1/2 \-translate-x-1/2 w-\[600px\] h-\[300px\] bg-indigo-500/20 blur-\[120px\] rounded-full pointer-events-none" /\>

      {/\* 3\. THE HERO CARD \*/}  
      \<div className="relative z-10 group"\>  
          
        {/\* Glow behind the card \*/}  
        \<div className="absolute \-inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-\[32px\] blur opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" /\>  
          
        {/\* Main Container \*/}  
        \<div className="relative w-\[340px\] bg-zinc-950 rounded-\[30px\] border border-white/10 shadow-2xl flex flex-col overflow-hidden"\>  
              
            {/\* \--- RIPPLE LAYER \--- \*/}  
            {/\* We place the ripple here as an overlay.   
                Using 'text-white' allows the currentColor to be white,   
                creating a "Flash" effect on the dark card. \*/}  
            \<Ripple   
                className="cursor-pointer"   
                color="text-white"   
                opacity={0.15} // Higher opacity for dramatic effect  
                onClick={() \=\> setUnlocked(\!unlocked)}  
            \>  
                {/\* CARD CONTENT \*/}  
                \<div className="h-full w-full p-8 flex flex-col justify-between relative z-20 pointer-events-none"\>  
                      
                    {/\* Header \*/}  
                    \<div className="flex justify-between items-start"\>  
                        \<div className="space-y-1"\>  
                            \<h3 className="text-zinc-400 text-xs font-medium uppercase tracking-\[0.2em\]"\>Security Level\</h3\>  
                            \<p className="text-white font-bold text-xl"\>Class A\</p\>  
                        \</div\>  
                        \<div className={\`p-2 rounded-full border transition-colors duration-500 ${unlocked ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}\`}\>  
                            {unlocked ? \<Unlock className="w-5 h-5" /\> : \<Lock className="w-5 h-5" /\>}  
                        \</div\>  
                    \</div\>

                    {/\* Central Graphic \*/}  
                    \<div className="flex-1 flex items-center justify-center"\>  
                        \<div className="relative"\>  
                            \<div className={\`absolute inset-0 bg-indigo-500 blur-\[40px\] transition-opacity duration-700 ${unlocked ? 'opacity-40' : 'opacity-0'}\`} /\>  
                            \<Fingerprint   
                                className={\`w-24 h-24 transition-all duration-700 ${unlocked ? 'text-indigo-400 scale-110 drop-shadow-\[0\_0\_15px\_rgba(129,140,248,0.8)\]' : 'text-zinc-700 scale-100'}\`}   
                                strokeWidth={1}   
                            /\>  
                        \</div\>  
                    \</div\>

                    {/\* Footer \*/}  
                    \<div className="space-y-6"\>  
                        \<div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" /\>  
                          
                        \<div className="flex items-center justify-between"\>  
                            \<div\>  
                                \<p className="text-zinc-500 text-xs"\>Biometric Scan\</p\>  
                                \<p className="text-zinc-300 text-sm font-medium mt-0.5"\>  
                                    {unlocked ? "Access Granted" : "Touch to Authorize"}  
                                \</p\>  
                            \</div\>  
                              
                            {/\* Small decorative arrow that moves on hover \*/}  
                            \<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors"\>  
                                \<ChevronRight className="w-5 h-5 text-zinc-400" /\>  
                            \</div\>  
                        \</div\>  
                    \</div\>

                \</div\>  
            \</Ripple\>

        \</div\>  
      \</div\>

      {/\* Instruction Label \*/}  
      \<div className="absolute bottom-12 text-zinc-500 text-xs font-mono tracking-widest opacity-60"\>  
        INTERACTIVE SURFACE • CLICK ANYWHERE  
      \</div\>

    \</div\>  
  );  
}  
\`\`\`

Implementation Guidelines  
 1\. Analyze the component structure and identify all required dependencies  
 2\. Review the component's argumens and state  
 3\. Identify any required context providers or hooks and install them  
 4\. Questions to Ask  
 \- What data/props will be passed to this component?  
 \- Are there any specific state management requirements?  
 \- Are there any required assets (images, icons, etc.)?  
 \- What is the expected responsive behavior?  
 \- What is the best place to use this component in the app?

Steps to integrate  
 0\. Copy paste all the code above in the correct directories  
 1\. Install external dependencies  
 2\. Fill image assets with Unsplash stock images you know exist  
 3\. Use lucide-react icons for svgs or logos if component requires them

