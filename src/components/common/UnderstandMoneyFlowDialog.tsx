import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface ChartData {
  budgetAllocation: Array<{ name: string; value: number; amount: string }>;
  spendingTrends: Array<{ month: string; allocated: number; spent: number }>;
  comparisons: Array<{ name: string; allocated: number; spent: number }>;
}

interface UnderstandMoneyFlowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chartData: ChartData;
  title?: string;
}

const UnderstandMoneyFlowDialog: React.FC<UnderstandMoneyFlowDialogProps> = ({
  open,
  onOpenChange,
  chartData,
  title = "📊 Understand Money Flow",
}) => {
  const { toast } = useToast();

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--border))'];

  const chartConfig = {
    allocated: {
      label: 'Allocated',
      color: 'hsl(var(--primary))',
    },
    spent: {
      label: 'Spent',
      color: 'hsl(var(--secondary))',
    },
  };

  const handleExportCharts = () => {
    // Export the provided chart data
    const exportData = {
      ...chartData,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `money-flow-charts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: 'Charts Exported',
      description: 'Chart data has been downloaded successfully.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Budget Distribution by State</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[400px]"
              >
                <PieChart>
                  <Pie
                    data={chartData.budgetAllocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 1).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.budgetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          `${value}%`,
                          chartData.budgetAllocation.find(d => d.name === name)?.amount || ''
                        ]}
                      />
                    }
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Spending vs Allocation Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <LineChart data={chartData.spendingTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="allocated"
                    stroke="var(--color-allocated)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke="var(--color-spent)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Budget Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <BarChart data={chartData.comparisons}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="allocated" fill="var(--color-allocated)" name="Allocated (Cr)" />
                  <Bar dataKey="spent" fill="var(--color-spent)" name="Spent (Cr)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Close
          </Button>
          <Button
            onClick={handleExportCharts}
            className="bg-green-500 text-white hover:bg-green-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Charts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnderstandMoneyFlowDialog;