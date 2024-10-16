import { CalendarCheck, ShoppingBasket, CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';


dayjs.locale('pt-br');

export function CardsProductExpiration() {
  const currentMonth = dayjs().format('MMMM');
  const nextMonth = dayjs().add(1, 'month').format('MMMM');

  return (
    <>
    <Card className="bg-[#05050a] w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
        <CardTitle className="text-sm font-medium">Total de Produtos cadastrados </CardTitle>
        <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">45</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>

    <Card className="bg-[#05050a] w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
        <CardTitle className="text-sm font-medium">Produtos vencendo esse Mês</CardTitle>
        <CalendarCheck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">25</div>
        <p className="text-xs text-muted-foreground">{currentMonth}</p>
      </CardContent>
    </Card>

    <Card className="bg-[#05050a] w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
        <CardTitle className="text-sm font-medium">Produtos vencendo Próximo Mês</CardTitle>
        <CalendarClock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">5</div>
        <p className="text-xs text-muted-foreground">{nextMonth}</p>
      </CardContent>
    </Card>

    

    </>
  );
}
