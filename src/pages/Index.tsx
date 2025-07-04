import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cart, setCart] = useState<any[]>([]);
  
  const games = [
    {
      id: 1,
      name: 'Fortnite',
      currency: 'V-Bucks',
      packages: [
        { amount: 1000, price: 899, discount: 10 },
        { amount: 2800, price: 2399, discount: 15 },
        { amount: 5000, price: 3999, discount: 20 }
      ],
      image: '/img/6f0264bf-1b19-4f1b-89ba-0fa5d3173cb5.jpg'
    },
    {
      id: 2,
      name: 'Valorant',
      currency: 'VP',
      packages: [
        { amount: 475, price: 499, discount: 5 },
        { amount: 1000, price: 999, discount: 10 },
        { amount: 2150, price: 1999, discount: 15 }
      ],
      image: '/img/6f0264bf-1b19-4f1b-89ba-0fa5d3173cb5.jpg'
    },
    {
      id: 3,
      name: 'League of Legends',
      currency: 'RP',
      packages: [
        { amount: 650, price: 599, discount: 8 },
        { amount: 1380, price: 1199, discount: 12 },
        { amount: 2800, price: 2299, discount: 18 }
      ],
      image: '/img/6f0264bf-1b19-4f1b-89ba-0fa5d3173cb5.jpg'
    }
  ];

  const addToCart = (game: any, packageItem: any) => {
    setCart([...cart, { ...game, selectedPackage: packageItem }]);
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.selectedPackage.price, 0);
  };

  const getTotalDiscount = () => {
    return cart.reduce((total, item) => {
      const originalPrice = item.selectedPackage.price / (1 - item.selectedPackage.discount / 100);
      return total + (originalPrice - item.selectedPackage.price);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Gamepad2" size={24} className="text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">GameCoin Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Корзина
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Игровая валюта
            <span className="block text-indigo-200">по лучшим ценам</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Мгновенная доставка • Система скидок • Безопасные платежи
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Мгновенная доставка</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>100% безопасность</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Percent" size={16} />
              <span>Скидки до 20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Games Catalog */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Популярные игры
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Icon name="Gamepad2" size={48} className="text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {game.name}
                    <Badge variant="secondary">{game.currency}</Badge>
                  </CardTitle>
                  <CardDescription>
                    Выберите подходящий пакет валюты
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {game.packages.map((pkg, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{pkg.amount.toLocaleString()} {game.currency}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <span className="line-through">
                            {Math.round(pkg.price / (1 - pkg.discount / 100))}₽
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            -{pkg.discount}%
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-indigo-600">{pkg.price}₽</div>
                        <Button 
                          size="sm" 
                          className="mt-1"
                          onClick={() => addToCart(game, pkg)}
                        >
                          Купить
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="py-8 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Корзина ({cart.length})</span>
                  <Button variant="ghost" size="sm" onClick={() => setCart([])}>
                    Очистить
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.selectedPackage.amount.toLocaleString()} {item.currency}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold">{item.selectedPackage.price}₽</span>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => removeFromCart(index)}
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Скидка:</span>
                    <span className="text-green-600">-{getTotalDiscount().toFixed(0)}₽</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-indigo-600">{getTotalPrice()}₽</span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Перейти к оплате
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Почему выбирают нас
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={32} className="text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Мгновенная доставка</h4>
              <p className="text-gray-600">Валюта поступает на ваш аккаунт в течение 5 минут</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Percent" size={32} className="text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Система скидок</h4>
              <p className="text-gray-600">Скидки до 20% и накопительные бонусы</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-indigo-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Безопасность</h4>
              <p className="text-gray-600">Все транзакции защищены и конфиденциальны</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;