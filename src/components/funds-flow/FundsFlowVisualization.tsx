import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  ChevronDown, 
  ChevronRight, 
  Building, 
  Hospital, 
  DollarSign, 
  TrendingUp,
  Shield,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Clock,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FundsFlowNode {
  id: string;
  name: string;
  amount: number;
  allocated?: number;
  type: 'national' | 'state' | 'hospital' | 'department';
  children?: FundsFlowNode[];
  recentDonations?: any[];
  recentFeePayments?: any[];
  metadata?: {
    lastUpdated?: string;
    projectsCount?: number;
    hospitalsCount?: number;
    status?: 'healthy' | 'warning' | 'danger';
  };
}

interface FundsFlowVisualizationProps {
  data: FundsFlowNode;
  onNodeClick?: (node: FundsFlowNode) => void;
  onVerifyClick?: (node: FundsFlowNode) => void;
  showSearch?: boolean;
}

const formatCurrency = (amount: number): string => {
  // Convert paise to rupees and format with Indian grouping
  const rupees = amount / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees);
};

const formatShortCurrency = (amount: number): string => {
  const rupees = amount / 100;
  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toFixed(1)} Cr`;
  } else if (rupees >= 100000) {
    return `₹${(rupees / 100000).toFixed(1)} L`;
  }
  return formatCurrency(amount);
};

const FundsFlowNode: React.FC<{
  node: FundsFlowNode;
  level: number;
  expanded: boolean;
  onToggle: () => void;
  onNodeClick: (node: FundsFlowNode) => void;
  onVerifyClick: (node: FundsFlowNode) => void;
  searchQuery?: string;
}> = ({ node, level, expanded, onToggle, onNodeClick, onVerifyClick, searchQuery = '' }) => {
  const hasChildren = node.children && node.children.length > 0;
  const spentPercentage = node.allocated ? (node.amount / node.allocated) * 100 : 0;
  const [showDropdown, setShowDropdown] = useState(false);
  
  const getNodeStyles = () => {
    switch (node.type) {
      case 'national':
        return 'w-[480px] min-h-[120px] bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30';
      case 'state':
        return 'w-[360px] min-h-[100px] bg-gradient-to-r from-secondary/5 to-accent/5 border border-secondary/30';
      case 'hospital':
        return 'w-[320px] min-h-[90px] bg-surface border border-border/50';
      case 'department':
        return 'w-[280px] min-h-[80px] bg-surface border border-border/30';
      default:
        return 'w-[340px] min-h-[85px] bg-surface border border-border/50';
    }
  };

  const getStatusColor = () => {
    if (!node.metadata?.status) return 'bg-success';
    switch (node.metadata.status) {
      case 'healthy': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'danger': return 'bg-danger';
      default: return 'bg-success';
    }
  };

  // Get transaction data from props or use mock data
  const getTransactionHistory = () => [
    { id: 'TXN_001', from: 'National Fund', to: 'Karnataka Health', amount: '₹300 Cr', date: '2025-09-10', status: 'Confirmed' },
    { id: 'TXN_002', from: 'Karnataka Health', to: 'Hospital B', amount: '₹50 Cr', date: '2025-09-08', status: 'Confirmed' },
    { id: 'TXN_003', from: 'Donor: Ravi Sharma', to: 'National Fund', amount: '₹5,000', date: '2025-09-12', status: 'Confirmed' }
  ];

  const getDonationHistory = () => {
    // Get from root node's recentDonations if available
    const rootNode = node;
    while (rootNode && rootNode.children) {
      // Find the topmost node
      if (rootNode.recentDonations) break;
    }
    return (rootNode as any)?.recentDonations || [
      { id: 'DON_001', from: 'Priya Reddy', amount: '₹10,000', date: '2025-09-12', target: 'Pathology' },
      { id: 'DON_002', from: 'Anonymous', amount: '₹25,000', date: '2025-09-11', target: 'Cardiology' },
      { id: 'DON_003', from: 'Amit Kumar', amount: '₹5,000', date: '2025-09-10', target: 'General Fund' }
    ];
  };

  const getFeePayments = () => {
    // Get from root node's recentFeePayments if available
    const rootNode = node;
    while (rootNode && rootNode.children) {
      // Find the topmost node
      if (rootNode.recentFeePayments) break;
    }
    return (rootNode as any)?.recentFeePayments || [
      { id: 'FEE_001', student: 'Rahul Sharma (1RV20CS001)', amount: '₹1,25,000', semester: 'Sem 5', date: '2025-09-10' },
      { id: 'FEE_002', student: 'Sneha Patel (1RV20CS045)', amount: '₹1,25,000', semester: 'Sem 5', date: '2025-09-09' },
      { id: 'FEE_003', student: 'Arjun Singh (1RV20EE023)', amount: '₹1,15,000', semester: 'Sem 3', date: '2025-09-08' }
    ];
  };

  // Filter transaction history based on search query
  const filterTransactionHistory = (data: any[]) => {
    if (!searchQuery) return data;
    
    return data.filter(item => {
      const searchText = searchQuery.toLowerCase();
      return (
        (item.student && item.student.toLowerCase().includes(searchText)) ||
        (item.from && item.from.toLowerCase().includes(searchText)) ||
        (item.to && item.to.toLowerCase().includes(searchText)) ||
        (item.target && item.target.toLowerCase().includes(searchText)) ||
        (item.id && item.id.toLowerCase().includes(searchText)) ||
        (item.amount && item.amount.toLowerCase().includes(searchText))
      );
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <Card className={cn(
        "hierarchy-node relative transition-all duration-300 cursor-pointer group",
        getNodeStyles(),
        expanded && "hierarchy-node-expanded shadow-lg"
      )}>
        <CardContent className="p-6 h-full flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
              {node.type === 'national' && <Building className="w-7 h-7 text-primary" />}
              {node.type === 'state' && <Building className="w-6 h-6 text-secondary" />}
              {node.type === 'hospital' && <Hospital className="w-6 h-6 text-accent" />}
              {node.type === 'department' && <DollarSign className="w-5 h-5 text-muted-foreground" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <div className="flex items-center space-x-3 mb-2">
                <h3 
                  className={cn(
                    "font-semibold cursor-pointer hover:text-primary transition-colors line-clamp-2",
                    node.type === 'national' ? 'text-lg' : 'text-base'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (node.type === 'national' || node.type === 'hospital') {
                      setShowDropdown(!showDropdown);
                    }
                  }}
                >
                  {node.name}
                </h3>
                <div className={cn("w-3 h-3 rounded-full flex-shrink-0", getStatusColor())} />
              </div>
              
              <div className="flex items-center space-x-3 mb-3">
                <span className={cn(
                  "font-bold text-foreground",
                  node.type === 'national' ? 'text-xl' : 'text-lg'
                )}>
                  {formatShortCurrency(node.amount)}
                </span>
                {node.allocated && (
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {spentPercentage.toFixed(0)}% spent
                  </Badge>
                )}
              </div>

              {/* Progress Bar for allocated amounts */}
              {node.allocated && (
                <Progress 
                  value={spentPercentage} 
                  className="w-full h-3 mb-3"
                />
              )}

              {/* Metadata */}
              {node.metadata && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {node.metadata.hospitalsCount && (
                    <span>Hospitals: {node.metadata.hospitalsCount}</span>
                  )}
                  {node.metadata.projectsCount && (
                    <span>Projects: {node.metadata.projectsCount}</span>
                  )}
                  {node.metadata.lastUpdated && (
                    <span>Updated: {node.metadata.lastUpdated}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end space-y-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onVerifyClick(node);
              }}
            >
              <Shield className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onNodeClick(node);
              }}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
              >
                {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </CardContent>

        {/* Connection Line for children */}
        {expanded && hasChildren && (
          <div className="absolute top-full left-1/2 transform -translate-x-0.5 w-0.5 h-6 bg-border/50" />
        )}
      </Card>

      {/* Children rendering when expanded */}
      {expanded && hasChildren && (
        <div className="relative mt-6">
          {/* Horizontal line for multiple children */}
          {node.children && node.children.length > 1 && (
            <div className="absolute -top-6 left-0 right-0 h-0.5 bg-border/50" />
          )}

          <div className="flex space-x-8">
            {node.children?.map((child) => (
              <div key={child.id} className="relative">
                {/* Vertical line to parent */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-0.5 w-0.5 h-6 bg-border/50" />

                <FundsFlowNodeContainer
                  node={child}
                  level={level + 1}
                  onNodeClick={onNodeClick}
                  onVerifyClick={onVerifyClick}
                  searchQuery={searchQuery}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Dropdown */}
      {showDropdown && (
        <Card className="absolute z-10 w-96 mt-2 shadow-lg border bg-background" style={{ top: '100%' }}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">
                {node.type === 'national'
                  ? (node.name.includes('Institution') ? 'Recent Fee Payment History' : 'Recent Donation History')
                  : 'Transaction History'}
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filterTransactionHistory(
                  node.type === 'national' && node.name.includes('Institution')
                    ? getFeePayments()
                    : node.type === 'national'
                      ? getDonationHistory()
                      : getTransactionHistory()
                ).map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded">
                    <div>
                      <div className="font-medium">
                        {'student' in item ? item.student :
                         'from' in item ? `${item.from} → ${item.to || (item as any).target}` : (item as any).id}
                      </div>
                      <div className="text-muted-foreground flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {(item as any).date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{(item as any).amount}</div>
                      {'status' in item && (
                        <Badge variant="secondary" className="text-xs">
                          {(item as any).status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setShowDropdown(false)}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const FundsFlowNodeContainer: React.FC<{
  node: FundsFlowNode;
  level: number;
  onNodeClick: (node: FundsFlowNode) => void;
  onVerifyClick: (node: FundsFlowNode) => void;
  searchQuery?: string;
}> = ({ node, level, onNodeClick, onVerifyClick, searchQuery }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <FundsFlowNode
      node={node}
      level={level}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      onNodeClick={onNodeClick}
      onVerifyClick={onVerifyClick}
      searchQuery={searchQuery}
    />
  );
};

const FundsFlowVisualization: React.FC<FundsFlowVisualizationProps> = ({
  data,
  onNodeClick = () => {},
  onVerifyClick = () => {},
  showSearch = true,
}) => {
  const [zoom, setZoom] = useState(0.3);
  const [breadcrumbs, setBreadcrumbs] = useState([{ name: 'National Funds', id: 'national' }]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.1));
  const handleResetZoom = () => setZoom(0.3);

  // Filter nodes based on search query
  const filterNodes = (node: FundsFlowNode): FundsFlowNode | null => {
    if (!searchQuery) return node;
    
    const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
    const filteredChildren = node.children?.map(child => filterNodes(child)).filter(Boolean) as FundsFlowNode[] | undefined;
    
    if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
      return {
        ...node,
        children: filteredChildren
      };
    }
    
    return null;
  };

  const filteredData = filterNodes(data) || data;

  return (
    <Card className="funds-flow-card min-h-[640px] p-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">Fund Flow Hierarchy</CardTitle>
            {/* Breadcrumbs */}
            <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.id}>
                  <button className="hover:text-primary transition-colors">
                    {crumb.name}
                  </button>
                  {index < breadcrumbs.length - 1 && <span>›</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Search Bar (if enabled) */}
          {showSearch && (
            <div className="relative mx-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Department / Vendor / Transaction ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-10"
              />
            </div>
          )}
          
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleResetZoom}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="overflow-auto">
        <div 
          className="flex justify-center py-8"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <FundsFlowNodeContainer
            node={filteredData}
            level={0}
            onNodeClick={onNodeClick}
            onVerifyClick={onVerifyClick}
            searchQuery={searchQuery}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FundsFlowVisualization;