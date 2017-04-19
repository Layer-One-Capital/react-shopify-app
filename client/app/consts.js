
// Boilerplate

let api_base = 'http://localhost:3000'
if (__PRERELEASE__)
  api_base = 'TODO https://api-stage.example.com'
else if (__RELEASE__)
  api_base = 'TODO https://api.example.com'
export const API_BASE = api_base

let www_base = 'TODO http://www.example.local:3000'
if (__PRERELEASE__)
  www_base = 'TODO https://www-stage.example.com'
else if (__RELEASE__)
  www_base = 'TODO https://www.example.com'
export const WWW_BASE = www_base

export const APP_NAME = 'TODO App name shown to users like Plug in SEO'
export const SUPPORT_EMAIL = 'TODO email address'
export const COMPANY_NAME = 'TODO company name shown to users like Pemberton Rank'

export const validations = {
  email: 'Please enter valid email address',
  url:   'Please enter valid url',
  equal: (a, b) => `${a} does not match the ${b}`,
}
