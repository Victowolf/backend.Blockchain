import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Download, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

interface Anomaly {
  id: string;
  type: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: string;
  amount?: string;
  department?: string;
  confidence: number;
}

interface AnomalyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AnomalyDialog: React.FC<AnomalyDialogProps> = ({ open, onOpenChange }) => {
  const anomalies: Anomaly[] = [
    {
      id: 'ANO_001',
      type: 'OVERSPEND',
      title: 'Budget Overspend Detected',
      description: 'Pathology — Hospital B has exceeded its allocated budget by 15% in the current fiscal year.',
      severity: 'high',
      detectedAt: '2025-09-13T14:30:00Z',
      amount: '₹1.5 Cr',
      department: 'Pathology - Hospital B',
      confidence: 92
    },
    {
      id: 'ANO_002',
      type: 'DUPLICATE_VENDOR',
      title: 'Rapid Multiple Payments',
      description: 'Multiple payments to MedEquip Solutions within 24 hours detected.',
      severity: 'medium',
      detectedAt: '2025-09-12T16:45:00Z',
      amount: '₹45 L',
      department: 'Cardiology - Hospital A',
      confidence: 78
    },
    {
      id: 'ANO_003',
      type: 'DUPLICATE_INVOICE',
      title: 'Duplicate Invoice Hash',
      description: 'Two transactions with identical document hash but different transaction IDs detected.',
      severity: 'critical',
      detectedAt: '2025-09-11T11:20:00Z',
      amount: '₹25 L',
      department: 'Administration - Hospital C',
      confidence: 95
    },
    {
      id: 'ANO_004',
      type: 'UNUSUAL_PATTERN',
      title: 'Unusual Spending Pattern',
      description: 'Unexpected spike in equipment purchases during off-season period.',
      severity: 'low',
      detectedAt: '2025-09-10T09:15:00Z',
      amount: '₹12 L',
      department: 'Orthopedics - Hospital D',
      confidence: 65
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-danger text-danger-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const exportAnomalies = () => {
    // Mock PDF export
    console.log('Exporting anomalies as PDF...');
    // In production, this would generate and download a PDF
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-xl">
              <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
              Anomaly Alerts Dashboard
            </DialogTitle>
            <Button variant="outline" onClick={exportAnomalies}>
              <Download className="w-4 h-4 mr-2" />
              Export as PDF
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger">1</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">1</div>
                <div className="text-sm text-muted-foreground">High</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">1</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary">1</div>
                <div className="text-sm text-muted-foreground">Low</div>
              </CardContent>
            </Card>
          </div>

          {/* Anomaly List */}
          <div className="space-y-3">
            {anomalies.map((anomaly) => (
              <Card key={anomaly.id} className="border-l-4 border-l-warning">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {anomaly.confidence}% confidence
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ID: {anomaly.id}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-1">{anomaly.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {anomaly.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        {anomaly.department && (
                          <div className="flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {anomaly.department}
                          </div>
                        )}
                        {anomaly.amount && (
                          <div className="font-medium text-foreground">
                            Amount: {anomaly.amount}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDate(anomaly.detectedAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnomalyDialog;