"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"
import { ForgotPasswordForm } from "./forgot-password-form"

export function AuthDialog() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const handleLoginSuccess = () => {
    setOpen(false) // Close dialog on successful login
  }

  const handleSignupSuccess = () => {
    setActiveTab("login") // Switch to login tab after successful signup
    // Optionally, show a success message on the login form
  }

  const handleForgotPasswordSuccess = () => {
    setActiveTab("login") // Switch to login tab after sending reset link
    // Optionally, show a success message on the login form
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-primary-dark-blue bg-transparent"
          size="sm"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-secondary-light-blue text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-accent-yellow">
            {activeTab === "login" && "Log In"}
            {activeTab === "signup" && "Sign Up"}
            {activeTab === "forgot-password" && "Forgot Password"}
          </DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary-dark-blue">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="forgot-password">Forgot Password</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm onSignupSuccess={handleSignupSuccess} onSwitchTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="forgot-password">
            <ForgotPasswordForm onForgotPasswordSuccess={handleForgotPasswordSuccess} onSwitchTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
