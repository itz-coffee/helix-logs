/**
 * Naming this file express-session.d.ts causes imports from "express-session"
 * to reference this file and not the node_modules package.
 */

 import express from "express";

 declare module "express-session" {
     export interface SessionData {
         rank?: string;
     }
 }