// Initialize Supabase client
const SUPABASE_URL = 'https://tprmenvvzosiggbsjxcy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcm1lbnZ2em9zaWdnYnNqeGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDgzOTYsImV4cCI6MjA1ODQ4NDM5Nn0.v0Dx_c2V5sysbTf3pRyETd5ZVT4uqXIz2pJZAXxn98Y';

// Create Supabase client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper functions
const showError = (message) => {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.classList.add('show');
        setTimeout(() => {
            errorContainer.classList.remove('show');
            errorContainer.textContent = '';
        }, 5000);
    }
};

const showSuccess = (message) => {
    const successContainer = document.getElementById('success-container');
    if (successContainer) {
        successContainer.textContent = message;
        successContainer.classList.add('show');
        setTimeout(() => {
            successContainer.classList.remove('show');
            successContainer.textContent = '';
        }, 5000);
    }
};

const setLoading = (button, isLoading) => {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
};

// Login functionality
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const button = loginForm.querySelector('button[type="submit"]');
        
        setLoading(button, true);
        
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            
            if (error) throw error;
            
            showSuccess('Login successful!');
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
            
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(button, false);
        }
    });
}

// Signup functionality
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const button = signupForm.querySelector('button[type="submit"]');
        
        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }
        
        if (password.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        
        setLoading(button, true);
        
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullname
                    }
                }
            });
            
            if (error) throw error;
            
            showSuccess('Sign up successful! Please check your email for verification.');
            
            // Redirect to login page after successful signup
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        } catch (error) {
            showError(error.message);
        } finally {
            setLoading(button, false);
        }
    });
}

// Social login handlers
const googleLogin = document.getElementById('google-login');
if (googleLogin) {
    googleLogin.addEventListener('click', async () => {
        try {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/index.html`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                        scope: 'openid email profile'
                    }
                }
            });
            
            if (error) throw error;
            
            // Store the OAuth data in localStorage
            if (data) {
                localStorage.setItem('oauth_data', JSON.stringify(data));
            }
            
        } catch (error) {
            showError(error.message);
            console.error('Google login error:', error);
        }
    });
}

const githubLogin = document.getElementById('github-login');
if (githubLogin) {
    githubLogin.addEventListener('click', async () => {
        try {
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/index.html`,
                    scopes: 'read:user user:email'
                }
            });
            
            if (error) throw error;
            
        } catch (error) {
            showError(error.message);
        }
    });
}

// Check authentication status
const checkAuth = async () => {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (user) {
            // User is logged in
            if (window.location.pathname.includes('login.html') || 
                window.location.pathname.includes('signup.html')) {
                window.location.href = 'index.html';
            }
            
            // Update UI for logged-in user
            const authBtns = document.querySelectorAll('.auth-btn');
            if (authBtns) {
                authBtns.forEach(btn => {
                    if (btn.classList.contains('signup')) {
                        btn.style.display = 'none';
                    } else {
                        btn.textContent = 'Logout';
                        btn.href = '#';
                        btn.addEventListener('click', async (e) => {
                            e.preventDefault();
                            await supabaseClient.auth.signOut();
                            window.location.href = 'index.html';
                        });
                    }
                });
            }
        }
    } catch (error) {
        console.error('Auth check error:', error);
    }
};

// Run auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);

// Test authentication functions
async function testAuth() {
    try {
        // Test signup
        const { data: signupData, error: signupError } = await supabaseClient.auth.signUp({
            email: 'nknileshkumar2.0@gmail.com',
            password: 'testpassword123'
        })
        
        if (signupError) {
            console.error('Signup error:', signupError.message)
        } else {
            console.log('Signup successful:', signupData)
        }

        // Test login
        const { data: loginData, error: loginError } = await supabaseClient.auth.signInWithPassword({
            email: 'nknileshkumar2.0@gmail.com',
            password: 'testpassword123'
        })

        if (loginError) {
            console.error('Login error:', loginError.message)
        } else {
            console.log('Login successful:', loginData)
        }

        // Test social login
        const { data: googleData, error: googleError } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (googleError) {
            console.error('Google login error:', googleError.message)
        } else {
            console.log('Google login initiated:', googleData)
        }

        // Test GitHub login
        const { data: githubData, error: githubError } = await supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: window.location.origin
            }
        })

        if (githubError) {
            console.error('GitHub login error:', githubError.message)
        } else {
            console.log('GitHub login initiated:', githubData)
        }

        // Test logout
        const { error: logoutError } = await supabaseClient.auth.signOut()
        
        if (logoutError) {
            console.error('Logout error:', logoutError.message)
        } else {
            console.log('Logout successful')
        }

    } catch (error) {
        console.error('Authentication test error:', error.message)
    }
}

// Run the test
testAuth() 