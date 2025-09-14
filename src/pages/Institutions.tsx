import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import FundsFlowVisualization from '@/components/funds-flow/FundsFlowVisualization';
import UnderstandMoneyFlowDialog from '@/components/common/UnderstandMoneyFlowDialog';
import { useMetaMask } from '@/hooks/useMetaMask';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  CreditCard,
  Building,
  FileText,
  Calendar,
  DollarSign,
  Award,
  Download,
  Filter,
  Wallet,
  BarChart3
} from 'lucide-react';

const Institutions = () => {
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024-25');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [showMoneyFlowDialog, setShowMoneyFlowDialog] = useState(false);
  
  // Institution-specific chart data
  const institutionChartData = {
    budgetAllocation: [
      { name: 'CSE Department', value: 35, amount: '₹15 Cr' },
      { name: 'EEE Department', value: 25, amount: '₹12 Cr' },
      { name: 'Architecture', value: 20, amount: '₹8 Cr' },
      { name: 'Infrastructure', value: 15, amount: '₹6 Cr' },
      { name: 'Administration', value: 5, amount: '₹2 Cr' },
    ],
    spendingTrends: [
      { month: 'Apr', allocated: 800, spent: 600 },
      { month: 'May', allocated: 900, spent: 750 },
      { month: 'Jun', allocated: 850, spent: 800 },
      { month: 'Jul', allocated: 1000, spent: 850 },
      { month: 'Aug', allocated: 950, spent: 900 },
      { month: 'Sep', allocated: 1100, spent: 950 },
    ],
    comparisons: [
      { name: 'Student Projects', allocated: 1200, spent: 800 },
      { name: 'Faculty Research', allocated: 1000, spent: 850 },
      { name: 'Lab Equipment', allocated: 800, spent: 750 },
      { name: 'Events & Competitions', allocated: 500, spent: 400 },
      { name: 'Infrastructure', allocated: 600, spent: 550 },
    ],
  };
  const [recentFeePayments, setRecentFeePayments] = useState([
    { id: 'FEE_001', student: 'Rahul Sharma (1RV20CS001)', amount: '₹1,25,000', semester: 'Sem 5', date: '2025-09-10' },
    { id: 'FEE_002', student: 'Sneha Patel (1RV20CS045)', amount: '₹1,25,000', semester: 'Sem 5', date: '2025-09-09' },
    { id: 'FEE_003', student: 'Arjun Singh (1RV20EE023)', amount: '₹1,15,000', semester: 'Sem 3', date: '2025-09-08' }
  ]);
  const { toast } = useToast();
  const { isConnected, account, isLoading, connectWallet, sendTransaction } = useMetaMask();

  // Mock data for institution funds flow
  const institutionFundsData = {
    id: 'inst-xyz-001',
    name: 'Institution Funds (₹80 Cr)',
    amount: 8000000000000, // ₹80 Cr in paise
    type: 'national' as const,
    metadata: {
      lastUpdated: '1d ago',
      status: 'healthy' as const
    },
    children: [
      {
        id: 'dept-cse-001',
        name: 'Computer Science & Engineering',
        amount: 1500000000000, // ₹15 Cr
        allocated: 2000000000000, // ₹20 Cr
        type: 'state' as const,
        metadata: {
          projectsCount: 45,
          lastUpdated: '2h ago',
          status: 'healthy' as const
        },
        children: [
          {
            id: 'proj-robocar-001',
            name: 'Student Projects',
            amount: 250000000, // ₹2.5 L
            allocated: 500000000, // ₹5 L
            type: 'hospital' as const,
            metadata: {
              status: 'healthy' as const
            }
          },
          {
            id: 'event-hackathon-001',
            name: 'Events',
            amount: 150000000, // ₹1.5 L
            allocated: 200000000, // ₹2 L
            type: 'hospital' as const,
            metadata: {
              status: 'healthy' as const
            }
          }
        ]
      },
      {
        id: 'dept-eee-001',
        name: 'Electrical & Electronics',
        amount: 1200000000000, // ₹12 Cr
        allocated: 1500000000000, // ₹15 Cr
        type: 'state' as const,
        metadata: {
          projectsCount: 32,
          lastUpdated: '4h ago',
          status: 'healthy' as const
        },
        children: [
          {
            id: 'eee-projects-001',
            name: 'Student Projects',
            amount: 200000000,
            allocated: 300000000,
            type: 'hospital' as const,
            metadata: { status: 'healthy' as const }
          },
          {
            id: 'eee-events-001',
            name: 'Events',
            amount: 100000000,
            allocated: 150000000,
            type: 'hospital' as const,
            metadata: { status: 'healthy' as const }
          }
        ]
      },
      {
        id: 'dept-arch-001',
        name: 'Architecture Department',
        amount: 800000000000, // ₹8 Cr
        allocated: 1000000000000, // ₹10 Cr
        type: 'state' as const,
        metadata: {
          projectsCount: 20,
          lastUpdated: '5h ago',
          status: 'healthy' as const
        },
        children: [
          {
            id: 'arch-projects-001',
            name: 'Student Projects',
            amount: 150000000,
            allocated: 250000000,
            type: 'hospital' as const,
            metadata: { status: 'healthy' as const }
          },
          {
            id: 'arch-events-001',
            name: 'Events',
            amount: 80000000,
            allocated: 120000000,
            type: 'hospital' as const,
            metadata: { status: 'healthy' as const }
          }
        ]
      }
    ]
  };

  const academicYears = [
    { value: '2024-25', label: 'Academic Year 2024-25' },
    { value: '2023-24', label: 'Academic Year 2023-24' },
    { value: '2022-23', label: 'Academic Year 2022-23' },
    { value: '2021-22', label: 'Academic Year 2021-22' }
  ];

  const semesters = [
    { value: 'sem1', label: 'Semester 1' },
    { value: 'sem2', label: 'Semester 2' },
    { value: 'sem3', label: 'Semester 3' },
    { value: 'sem4', label: 'Semester 4' },
    { value: 'sem5', label: 'Semester 5' },
    { value: 'sem6', label: 'Semester 6' },
    { value: 'sem7', label: 'Semester 7' },
    { value: 'sem8', label: 'Semester 8' }
  ];

  const summaryCards = [
    {
      title: 'Total Fees Collected',
      value: '₹50,00,00,000',
      subtitle: 'As of Sep 13, 2025',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Total Govt Funds',
      value: '₹20,00,00,000',
      subtitle: 'Grants, Scholarships',
      icon: Building,
      color: 'text-primary'
    },
    {
      title: 'Total Donations',
      value: '₹10,00,00,000',
      subtitle: 'Donor-funded projects',
      icon: Award,
      color: 'text-accent'
    }
  ];

  const projects = [
    {
      id: 'proj-001',
      name: 'AI-Based Traffic Management',
      owner: 'Priya Reddy (1RV20CS045)',
      description: 'Machine learning system to optimize traffic flow in urban areas',
      requested: 500000000, // ₹5 L in paise
      funded: 300000000, // ₹3 L in paise
      department: 'CSE'
    },
    {
      id: 'proj-002',
      name: 'Solar Energy Optimization',
      owner: 'Amit Kumar (1RV20EE023)',
      description: 'IoT-based system to maximize solar panel efficiency',
      requested: 400000000, // ₹4 L in paise
      funded: 400000000, // ₹4 L in paise (fully funded)
      department: 'EEE'
    },
    {
      id: 'proj-003',
      name: 'Autonomous Drone Delivery',
      owner: 'Sarah Johnson (1RV20ME067)',
      description: 'Drone system for medical supply delivery in remote areas',
      requested: 600000000, // ₹6 L in paise
      funded: 150000000, // ₹1.5 L in paise
      department: 'MECH'
    }
  ];

  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
    // TODO: Open project details or department view
  };

  const handleVerifyClick = (node: any) => {
    console.log('Verify clicked:', node);
    // TODO: Open verification modal
  };

  const handlePayFees = async () => {
    if (!studentId || !selectedSemester || !feeAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!isConnected) {
        await connectWallet();
      }

      const transaction = await sendTransaction(feeAmount, 'institution-account');
      
      // Add new fee payment to the list
      const newFeePayment = {
        id: `FEE_${Date.now()}`,
        student: `${studentName} (${studentId})`,
        amount: `₹${feeAmount}`,
        semester: selectedSemester,
        date: new Date().toISOString().split('T')[0]
      };
      setRecentFeePayments(prev => [newFeePayment, ...prev.slice(0, 4)]);
      
      toast({
        title: "Fee Payment Successful!",
        description: `Paid ${feeAmount} for ${studentId}. Transaction hash: ${transaction.hash.substring(0, 10)}...`,
      });

      // Reset form
      setStudentId('');
      setStudentName('');
      setSelectedSemester('');
      setFeeAmount('');
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number): string => {
    const rupees = amount / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(rupees);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <Card className="funds-flow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-primary" />
                XYZ Engineering Institution — FundsFlow
              </h1>
              <p className="text-muted-foreground text-lg">
                Track fees, government grants and donations across academic years, departments, and student projects.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Academic Year Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Academic Year
                </label>
                <Select value={selectedAcademicYear} onValueChange={setSelectedAcademicYear}>
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {academicYears.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  All amounts are fiscal year based
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <Card key={index} className="funds-flow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{card.value}</div>
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                <Button variant="link" className="h-auto p-0 text-xs mt-2">
                  View breakdown
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Funds Flow Visualization with Button */}
            <Card className="funds-flow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Fund Flow Hierarchy</CardTitle>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowMoneyFlowDialog(true)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Understand Money Flow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FundsFlowVisualization
                  data={{...institutionFundsData, recentFeePayments}}
                  onNodeClick={handleNodeClick}
                  onVerifyClick={handleVerifyClick}
                />
              </CardContent>
            </Card>

            {/* Department Projects */}
            <Card className="funds-flow-card">
              <CardHeader>
                <CardTitle className="text-xl">Student Projects</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Active projects seeking funding and community support
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold">{project.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {project.department}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {project.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Owner: {project.owner}
                            </p>
                          </div>
                          
                          <div className="flex flex-col space-y-2 md:items-end">
                            <div className="text-sm">
                              <span className="font-medium">
                                {formatCurrency(project.funded)}
                              </span>
                              <span className="text-muted-foreground">
                                {' '}/ {formatCurrency(project.requested)}
                              </span>
                            </div>
                            <div className="w-32 bg-border/30 rounded-full h-2">
                              <div 
                                className="bg-primary rounded-full h-2 transition-all"
                                style={{ 
                                  width: `${(project.funded / project.requested) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table */}
            <Card className="funds-flow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Transactions</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/30">
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Txn ID</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Category</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">From</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">To</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transaction-row">
                        <td className="p-3 text-sm font-mono">TXN_INS_001</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-xs">Fee</Badge>
                        </td>
                        <td className="p-3 text-sm">Student Payment</td>
                        <td className="p-3 text-sm">Institution Account</td>
                        <td className="p-3 text-sm font-medium">₹1,25,000</td>
                        <td className="p-3 text-sm">2025-09-10</td>
                        <td className="p-3">
                          <Badge className="status-badge confirmed">Confirmed</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Verify</Button>
                            <Button variant="ghost" size="sm">Details</Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="transaction-row">
                        <td className="p-3 text-sm font-mono">TXN_INS_002</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-xs">Project</Badge>
                        </td>
                        <td className="p-3 text-sm">Donor Contribution</td>
                        <td className="p-3 text-sm">AI Traffic Project</td>
                        <td className="p-3 text-sm font-medium">₹50,000</td>
                        <td className="p-3 text-sm">2025-09-08</td>
                        <td className="p-3">
                          <Badge className="status-badge confirmed">Confirmed</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Verify</Button>
                            <Button variant="ghost" size="sm">Details</Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Fee Payment */}
            <Card className="funds-flow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Pay Fees
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Secure payments via gateway. All payments recorded in FundsFlow ledger.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <Input
                    placeholder="e.g., 1RV20CS001"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <Input
                    placeholder="Auto-fill if logged in"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Semester</label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester.value} value={semester.value}>
                          {semester.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="₹1,25,000"
                      value={feeAmount}
                      onChange={(e) => setFeeAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="wallet">Digital Wallet</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  variant="cta" 
                  onClick={handlePayFees}
                  disabled={isLoading}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isLoading ? 'Processing...' : isConnected ? 'Pay Now' : 'Connect MetaMask & Pay'}
                </Button>

                {isConnected && account && (
                  <p className="text-xs text-center text-muted-foreground">
                    Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Department Stats */}
            <Card className="funds-flow-card">
              <CardHeader>
                <CardTitle className="text-lg">Department Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">CSE</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">45 Projects</div>
                    <div className="text-xs text-muted-foreground">₹15 Cr Allocated</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">EEE</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">32 Projects</div>
                    <div className="text-xs text-muted-foreground">₹12 Cr Allocated</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">MECH</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">28 Projects</div>
                    <div className="text-xs text-muted-foreground">₹11 Cr Allocated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Understand Money Flow Dialog */}
        <UnderstandMoneyFlowDialog
          open={showMoneyFlowDialog}
          onOpenChange={setShowMoneyFlowDialog}
          chartData={institutionChartData}
          title="📊 Institution Fund Flow Analysis"
        />
      </div>
    </Layout>
  );
};

export default Institutions;