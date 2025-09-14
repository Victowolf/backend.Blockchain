import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import FundsFlowVisualization from '@/components/funds-flow/FundsFlowVisualization';
import AnomalyDialog from '@/components/common/AnomalyDialog';
import UnderstandMoneyFlowDialog from '@/components/common/UnderstandMoneyFlowDialog';
import { useMetaMask } from '@/hooks/useMetaMask';
import { 
  Share, 
  TrendingUp, 
  Users, 
  Building, 
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  DollarSign,
  Wallet,
  BarChart3
} from 'lucide-react';

const Government = () => {
  const [selectedScheme, setSelectedScheme] = useState('nhm');
  const [selectedTimeframe, setSelectedTimeframe] = useState('fy2024-25');
  const [donationAmount, setDonationAmount] = useState('');
  const [donationTarget, setDonationTarget] = useState('');
  const [showAnomalyDialog, setShowAnomalyDialog] = useState(false);
  const [showMoneyFlowDialog, setShowMoneyFlowDialog] = useState(false);
  
  // Government-specific chart data
  const governmentChartData = {
    budgetAllocation: [
      { name: 'Karnataka', value: 30, amount: '₹3,000 Cr' },
      { name: 'Maharashtra', value: 25, amount: '₹2,500 Cr' },
      { name: 'Tamil Nadu', value: 20, amount: '₹2,000 Cr' },
      { name: 'Gujarat', value: 15, amount: '₹1,500 Cr' },
      { name: 'Other States', value: 10, amount: '₹1,000 Cr' },
    ],
    spendingTrends: [
      { month: 'Apr', allocated: 1000, spent: 800 },
      { month: 'May', allocated: 1200, spent: 950 },
      { month: 'Jun', allocated: 1100, spent: 1050 },
      { month: 'Jul', allocated: 1300, spent: 1100 },
      { month: 'Aug', allocated: 1250, spent: 1200 },
      { month: 'Sep', allocated: 1400, spent: 1300 },
    ],
    comparisons: [
      { name: 'Health', allocated: 4000, spent: 3200 },
      { name: 'Education', allocated: 3500, spent: 3100 },
      { name: 'Infrastructure', allocated: 2500, spent: 2300 },
      { name: 'Agriculture', allocated: 2000, spent: 1800 },
      { name: 'Defense', allocated: 1800, spent: 1700 },
    ],
  };
  const [recentDonations, setRecentDonations] = useState([
    { id: 'DON_001', from: 'Priya Reddy', amount: '₹10,000', date: '2025-09-12', target: 'Pathology' },
    { id: 'DON_002', from: 'Anonymous', amount: '₹25,000', date: '2025-09-11', target: 'Cardiology' },
    { id: 'DON_003', from: 'Amit Kumar', amount: '₹5,000', date: '2025-09-10', target: 'General Fund' }
  ]);
  const { toast } = useToast();
  const { isConnected, account, isLoading, connectWallet, sendTransaction } = useMetaMask();

  // Mock data for the funds flow visualization
  const fundsFlowData = {
    id: 'national-001',
    name: 'National Health Fund',
    amount: 1000000000000, // ₹10,000 Cr in paise
    type: 'national' as const,
    metadata: {
      lastUpdated: '2d ago',
      status: 'healthy' as const
    },
    children: [
      {
        id: 'state-ka-01',
        name: 'Karnataka Health Dept',
        amount: 225000000000, // ₹2,250 Cr spent
        allocated: 300000000000, // ₹3,000 Cr allocated
        type: 'state' as const,
        metadata: {
          hospitalsCount: 200,
          projectsCount: 1250,
          lastUpdated: '2d ago',
          status: 'healthy' as const
        },
        children: [
          {
            id: 'hosp-b-003',
            name: 'Hospital B',
            amount: 50000000000, // ₹500 Cr
            allocated: 60000000000,
            type: 'hospital' as const,
            metadata: {
              status: 'warning' as const
            },
            children: [
              {
                id: 'dept-patho-001',
                name: 'Pathology',
                amount: 1250000000, // ₹12.5 Cr
                allocated: 1000000000, // ₹10 Cr (overspent)
                type: 'department' as const,
                metadata: {
                  status: 'danger' as const
                }
              },
              {
                id: 'dept-cardio-001',
                name: 'Cardiology',
                amount: 800000000,
                allocated: 1500000000,
                type: 'department' as const,
                metadata: {
                  status: 'healthy' as const
                }
          },
          {
            id: 'hosp-a-001',
            name: 'Hospital A',
            amount: 45000000000,
            allocated: 55000000000,
            type: 'hospital' as const,
            metadata: {
              status: 'healthy' as const
            }
          }
        ]
      }
        ]
      },
      {
        id: 'state-mh-01',
        name: 'Maharashtra Health Dept',
        amount: 180000000000,
        allocated: 250000000000,
        type: 'state' as const,
        metadata: {
          hospitalsCount: 180,
          projectsCount: 890,
          lastUpdated: '1d ago',
          status: 'healthy' as const
        },
        children: [
          {
            id: 'hosp-c-001',
            name: 'Hospital C',
            amount: 40000000000,
            allocated: 50000000000,
            type: 'hospital' as const,
            metadata: {
              status: 'healthy' as const
            }
          },
          {
            id: 'hosp-d-001',
            name: 'Hospital D',
            amount: 35000000000,
            allocated: 45000000000,
            type: 'hospital' as const,
            metadata: {
              status: 'healthy' as const
            }
          }
        ]
      }
    ]
  };

  const schemes = [
    { value: 'nhm', label: 'National Health Mission', description: 'Primary healthcare infrastructure' },
    { value: 'ayushman', label: 'Ayushman Bharat', description: 'Health insurance for all' },
    { value: 'polio', label: 'Polio Eradication', description: 'Immunization program' },
    { value: 'tb', label: 'TB Control', description: 'Tuberculosis elimination' },
    { value: 'covid', label: 'COVID Relief Fund', description: 'Pandemic response measures' }
  ];

  const timeframes = [
    { value: 'last30', label: 'Last 30 days' },
    { value: 'last6months', label: 'Last 6 months' },
    { value: 'fy2024-25', label: 'Fiscal Year 2024-25' },
    { value: 'fy2023-24', label: 'Fiscal Year 2023-24' }
  ];

  const quickFacts = [
    { label: 'Total Donors', value: '1,24,567', change: '+12%' },
    { label: 'Total Donated', value: '₹45.2 Cr', change: '+8%' },
    { label: 'Avg Donation', value: '₹3,640', change: '+3%' }
  ];

  const handleNodeClick = (node: any) => {
    console.log('Node clicked:', node);
    // TODO: Open detailed transaction modal
  };

  const handleVerifyClick = (node: any) => {
    console.log('Verify clicked:', node);
    // TODO: Open verification modal
  };

  const handleShareClick = () => {
    // Mock download of transaction history
    const data = {
      nationalFund: fundsFlowData,
      timestamp: new Date().toISOString(),
      totalTransactions: 1250,
      totalAmount: "₹10,000 Cr"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fundsflow_history_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Transaction History Downloaded",
      description: "Complete transaction history has been downloaded successfully.",
    });
  };

  const handleDonateClick = async () => {
    if (!donationAmount || !donationTarget) {
      toast({
        title: "Missing Information",
        description: "Please enter donation amount and select target.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (!isConnected) {
        await connectWallet();
      }

      const transaction = await sendTransaction(donationAmount, donationTarget);
      
      // Add new donation to the list
      const newDonation = {
        id: `DON_${Date.now()}`,
        from: account || 'Anonymous',
        amount: `₹${donationAmount}`,
        date: new Date().toISOString().split('T')[0],
        target: donationTarget
      };
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      toast({
        title: "Donation Successful!",
        description: `Donated ${donationAmount} to ${donationTarget}. Transaction hash: ${transaction.hash.substring(0, 10)}...`,
      });

      // Reset form
      setDonationAmount('');
      setDonationTarget('');
    } catch (error: any) {
      toast({
        title: "Donation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <Card className="funds-flow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">Health Ministry — FundsFlow</h1>
              <p className="text-muted-foreground text-lg">
                Track national schemes, state allocations and hospital spending in a traceable ledger.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Scheme Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Scheme
                </label>
                <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {schemes.map((scheme) => (
                      <SelectItem key={scheme.value} value={scheme.value}>
                        <div>
                          <div className="font-medium">{scheme.label}</div>
                          <div className="text-xs text-muted-foreground">{scheme.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Timeframe Selector */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Timeframe
                </label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((timeframe) => (
                      <SelectItem key={timeframe.value} value={timeframe.value}>
                        {timeframe.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleShareClick}>
                  <Share className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content - Funds Flow Visualization */}
          <div className="lg:col-span-3 space-y-6">
            {/* Anomaly Alert */}
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Overspend Alert: Pathology — Hospital B has exceeded its allocated budget by 15% in the current fiscal year.
                    </p>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-warning hover:text-warning/80"
                      onClick={() => setShowAnomalyDialog(true)}
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  data={{...fundsFlowData, recentDonations}}
                  onNodeClick={handleNodeClick}
                  onVerifyClick={handleVerifyClick}
                />
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="funds-flow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Allocation by State
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Karnataka</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Maharashtra</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tamil Nadu</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Other States</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="funds-flow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Spending Trend
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span>8% increase from last month</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>Allocated: ₹10,000 Cr</div>
                    <div>Spent: ₹7,250 Cr (72.5%)</div>
                    <div>Remaining: ₹2,750 Cr</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="funds-flow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Top Vendors
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>MedEquip Solutions</span>
                      <span className="font-medium">₹450 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HealthTech India</span>
                      <span className="font-medium">₹320 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pharma Logistics</span>
                      <span className="font-medium">₹280 Cr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Donation Box */}
            <Card className="funds-flow-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-primary" />
                  Make a Contribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Support hospitals or specific departments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Donation Amount</label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="₹5,000"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Select Target</label>
                  <Select value={donationTarget} onValueChange={setDonationTarget}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="national">National Fund</SelectItem>
                      <SelectItem value="karnataka">Karnataka Health Dept</SelectItem>
                      <SelectItem value="hospital-b">Hospital B</SelectItem>
                      <SelectItem value="pathology">Pathology Dept</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Optional Message</label>
                  <Textarea
                    placeholder="E.g., For new ECG machine"
                    className="mt-1 min-h-[60px]"
                  />
                </div>

                <Button 
                  className="w-full" 
                  variant="cta" 
                  onClick={handleDonateClick}
                  disabled={isLoading}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isLoading ? 'Processing...' : isConnected ? 'Donate via Wallet' : 'Connect MetaMask & Donate'}
                </Button>

                {isConnected && account && (
                  <p className="text-xs text-center text-muted-foreground">
                    Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </p>
                )}

                <p className="text-xs text-muted-foreground text-center">
                  All donations recorded on the FundsFlow ledger and{' '}
                  <Button variant="link" className="h-auto p-0 text-xs">
                    verifiable
                  </Button>
                </p>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card className="funds-flow-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickFacts.map((fact, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">{fact.label}</div>
                      <div className="text-lg font-bold">{fact.value}</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {fact.change}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction Table */}
        <Card className="funds-flow-card mt-8">
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
                    <td className="p-3 text-sm font-mono">TXN_000112</td>
                    <td className="p-3 text-sm">National Fund</td>
                    <td className="p-3 text-sm">Karnataka Health Dept</td>
                    <td className="p-3 text-sm font-medium">₹10,00,00,000</td>
                    <td className="p-3 text-sm">2025-03-15</td>
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
                    <td className="p-3 text-sm font-mono">TXN_000113</td>
                    <td className="p-3 text-sm">Karnataka Health Dept</td>
                    <td className="p-3 text-sm">Hospital B</td>
                    <td className="p-3 text-sm font-medium">₹5,00,00,000</td>
                    <td className="p-3 text-sm">2025-06-20</td>
                    <td className="p-3">
                      <Badge className="status-badge pending">Pending</Badge>
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

        {/* Anomaly Dialog */}
        <AnomalyDialog
          open={showAnomalyDialog}
          onOpenChange={setShowAnomalyDialog}
        />

        {/* Understand Money Flow Dialog */}
        <UnderstandMoneyFlowDialog
          open={showMoneyFlowDialog}
          onOpenChange={setShowMoneyFlowDialog}
          chartData={governmentChartData}
          title="📊 Government Fund Flow Analysis"
        />
      </div>
    </Layout>
  );
};

export default Government;