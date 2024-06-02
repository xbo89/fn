import { Controller, Get, Res, Req, Redirect, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { createClient } from '@supabase/supabase-js';
import { Request, Response } from 'express';

const supabase = createClient(
  'https://enxogxbtvgjpbybgllxw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueG9neGJ0dmdqcGJ5YmdsbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3ODExMzksImV4cCI6MjAyOTM1NzEzOX0.ckGnzpi6sUf3XR4icHHZi5SEkdIzkDa_hXNJqqaoA2s',
  {
    auth: {
      flowType: 'pkce',
    },
  },
);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/auth/signwithgoogle')
  async login() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3002/auth/callback',
      },
    });
    return data;
  }

  @Get('/auth/callback')
  @Redirect()
  async authCallback(@Req() req: Request): Promise<object> {
    const code = req.query.code;
    const codeString = code.toString();
    if (code) {
      await supabase.auth.exchangeCodeForSession(codeString);
    }
    return { url: 'http://localhost:3000/list' };
  }

  @Get('/auth/islogin')
  async isLogin(): Promise<object> {
    const user = await supabase.auth.getUser();
    console.log(user);
    return user;
  }

  @Get('/auth/userinfo')
  async userinfo(): Promise<object> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }
}
