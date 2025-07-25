import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Download } from 'lucide-react';

export function OrderManager() {
  const orders = [
    {
      id: '#1001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 24999,
      status: 'processing',
      date: '2024-01-15',
      items: 3,
    },
    {
      id: '#1002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 16999,
      status: 'shipped',
      date: '2024-01-14',
      items: 2,
    },
    {
      id: '#1003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      total: 49999,
      status: 'delivered',
      date: '2024-01-13',
      items: 1,
    },
    {
      id: '#1004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      total: 12499,
      status: 'pending',
      date: '2024-01-12',
      items: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="p-4">{order.items} items</td>
                    <td className="p-4 font-medium">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Select defaultValue={order.status}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}