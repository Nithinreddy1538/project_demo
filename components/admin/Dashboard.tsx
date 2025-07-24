import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '124',
      change: '+12%',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Orders Today',
      value: '23',
      change: '+5%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Total Customers',
      value: '1,234',
      change: '+18%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Revenue',
      value: '₹10,23,450',
      change: '-3%',
      trend: 'down',
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm">
                  <TrendIcon className={`h-3 w-3 mr-1 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Order #100{i}</p>
                    <p className="text-sm text-gray-600">customer{i}@email.com</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{Math.floor(Math.random() * 50000 + 5000).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">
                      {i < 3 ? 'Processing' : 'Shipped'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['iPhone 15 Pro', 'Samsung Galaxy S24', 'MacBook Air', 'Apple Watch', 'AirPods Pro'].map((product, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50 + 10)} sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{Math.floor(Math.random() * 100000 + 10000).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}