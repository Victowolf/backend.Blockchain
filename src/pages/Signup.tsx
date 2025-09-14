import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Shield,
  Mail,
  User,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    organization: '',
    acceptTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const roles = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' },
    { value: 'govt_official', label: 'Government Official' },
    { value: 'institution_admin', label: 'Institution Admin' },
    { value: 'auditor', label: 'Auditor' }
  ];

  const validatePassword = (password: string) => {
    const criteria = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[A-Z]/, text: 'One uppercase letter' },
      { regex: /[0-9]/, text: 'One number' },
      { regex: /[^A-Za-z0-9]/, text: 'One special character' }
    ];

    const strength = criteria.filter(criterion => criterion.regex.test(password)).length;
    setPasswordStrength((strength / criteria.length) * 100);

    return criteria.every(criterion => criterion.regex.test(password));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.fullName.length < 3) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters and include a number and a special character.';
    }

    if (!formData.role) {
      errors.role = 'Please select your role.';
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms to continue.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Validate password strength in real-time
    if (field === 'password' && typeof value === 'string') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return { text: 'Weak', color: 'text-danger' };
    if (passwordStrength < 75) return { text: 'Medium', color: 'text-warning' };
    return { text: 'Strong', color: 'text-success' };
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-danger';
    if (passwordStrength < 75) return 'bg-warning';
    return 'bg-success';
  };

  if (isSuccess) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-12">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
              </div>
              <CardTitle className="text-2xl">Account Created!</CardTitle>
              <CardDescription>
                A verification email has been sent to <strong>{formData.email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                Resend Verification
              </Button>
              <Button className="w-full" asChild>
                <Link to="/login">Continue to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your FundsFlow account</CardTitle>
            <CardDescription>
              Join the transparency revolution in financial tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-danger">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    placeholder="e.g., Priya Reddy"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={cn("pl-10", validationErrors.fullName && "border-danger")}
                  />
                </div>
                {validationErrors.fullName && (
                  <p className="text-sm text-danger flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {validationErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-danger">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn("pl-10", validationErrors.email && "border-danger")}
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-sm text-danger flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-danger">*</span>
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={cn("pl-10 pr-10", validationErrors.password && "border-danger")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Password strength</span>
                      <span className={cn("text-xs font-medium", getPasswordStrengthText().color)}>
                        {getPasswordStrengthText().text}
                      </span>
                    </div>
                    <Progress 
                      value={passwordStrength} 
                      className={cn("h-2", getPasswordStrengthColor())}
                    />
                  </div>
                )}
                
                {validationErrors.password && (
                  <p className="text-sm text-danger flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-danger">*</span>
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger className={cn(validationErrors.role && "border-danger")}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.role && (
                  <p className="text-sm text-danger flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {validationErrors.role}
                  </p>
                )}
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <Label htmlFor="organization">Organization (Optional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="organization"
                    placeholder="e.g., UVCE, Health Dept — optional"
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                    className={cn(validationErrors.acceptTerms && "border-danger")}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                    I accept the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      FundsFlow Terms of Use
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {validationErrors.acceptTerms && (
                  <p className="text-sm text-danger flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    {validationErrors.acceptTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                variant="hero"
                disabled={isSubmitting || !formData.acceptTerms}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-sm text-muted-foreground">Already have an account? </span>
                <Link to="/login" className="text-sm text-primary hover:underline font-medium">
                  Log in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;