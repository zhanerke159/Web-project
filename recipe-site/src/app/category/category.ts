import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../models/products';
import { Category } from '../models/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  filteredProducts: Products[] = [];

  allProducts: Products[] = [
  {id: 1,name: 'Double Cheeseburger',description: 'Classic burger with double cheese',time: '20 minutes',category: 1,image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2025/12/shutterstock_1155619606.jpg?quality=82&strip=all'},
  {id: 2,name: 'Pepperoni Pizza',description: 'Hot and spicy pizza.',time: '25 minutes',category: 1,image: 'https://t3.ftcdn.net/jpg/07/18/12/50/360_F_718125027_z5RIf7ItiP8Lz6q7zYV0NgzsgW6FfeG0.jpg'},
  {id: 3,name: 'Chicken Wrap',description: 'Grilled chicken wrapped with fresh vegetables and creamy sauce in a soft tortilla.',time: '10 minutes',category: 1,image: 'https://i.pinimg.com/originals/ff/37/b0/ff37b062b87da1ccc9e3b5f08d382ea1.jpg'},
  {id: 4,name: 'Nuggets',time: '15 minutes',description: 'Yummy food which is ready in 15 minutes.',category: 1,image: 'https://avatars.mds.yandex.net/i?id=871bb4c05a9b3e1a20f8b92c680fefae_l-5419733-images-thumbs&n=13'},
  {id: 5,name: 'French fries',description: 'Really crispy from the outside and soft from the inside French fries.',time: '20 minutes',category: 1,image: 'https://i.pinimg.com/736x/73/7e/d9/737ed93987aae98a76fc2e5f12fc0ecc.jpg'},
  {id: 6,name: 'Onigiri',description: 'Soft rice pyramids with the filling inside.',time: '18 minutes',category: 1,image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'},
  {id: 7,name: 'Cheese Quesadilla',description: 'A crispy tortilla filled with melted cheese, perfect for a quick snack.',time: '5 minutes',category: 1,image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'},
  {id: 8,name: 'Fish Tacos',description: 'Lightly battered fish fillets with cabbage slaw and a tangy sauce in soft tacos.',time: '15 minutes',category: 1,image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'},
  {id: 9,name: 'Chocolate Cake',description: 'Sweet chocolate dessert',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 10,name: 'Napoleon',description: 'Cake with thin biscuit layers and smooth cream between each layer.',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 11,name: 'Russian kulich',description: 'Soft biscuit with sweet filling for your taste.',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 12,name: 'Macaroons',description: 'Crispy meringue with thick and delicate cream and the filling inside of whatever taste you like',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 13,name: 'Donuts',description: 'Fluffy sweet dough coated in a chocolate',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 14,name: 'Cookies',description: 'Crispy cookies with rich amount of chocolate in it.',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 15,name: 'Merringue roulette',description: 'A bit crispy and delicate layer of merringue, with light and sweet cream inside.',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 16,name: 'Ice cream',description: 'Thick and delicate cold dessert with differernt tastes.',category: 2,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 17,name: 'Iced coffee',description: 'Cold and refreshing coffee with ice cubes.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 18,name: 'Smoothie',description: 'A blended drink made from fruit, yogurt or milk, and sometimes vegetables, creating a creamy, nutritious beverage.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 19,name: 'Milkshake',description: 'A thick and creamy drink made with milk, ice cream, and flavorings like chocolate or vanilla.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 20,name: 'Marroccan tea',description: 'Sweet tea made by steeping green tea with fresh mint leaves and sweetened with sugar.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 21,name: 'Bubble tea',description: 'Red colored sweet tea having gunpowder, mint and sugar.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 22,name: 'Lemonade',description: 'A sweet and tart drink made from lemon juice, water, and sugar, often served chilled.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 23,name: 'Mojito',description: 'A refreshing cocktail made with rum, mint, lime, sugar, and soda water, perfect for hot weather.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 24,name: 'Margarita',description: 'A classic cocktail made with tequila, lime juice, and orange liqueur, served with a salted rim.',category: 3,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 25,name: 'Caesar',description: 'A classic salad made with romaine lettuce, croutons, parmesan cheese, and Caesar dressing, often topped with grilled chicken or bacon',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 26,name: 'Tabbouleh',description: 'A refreshing Middle Eastern salad made with parsley, bulgur wheat, tomatoes, cucumbers, mint, and dressed with olive oil, lemon juice, and salt.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 27,name: 'Pasta Salad',description: 'A versatile salad made with cooked pasta, often mixed with vegetables, cheese, and a tangy dressing, commonly served chilled.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 28,name: 'Nicoise Salad',description: 'A French salad featuring tuna, hard-boiled eggs, green beans, potatoes, olives, tomatoes, and anchovies, typically served with a vinaigrette dressing.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 29,name: 'Greek salad',description: 'Fresh dish made with tomatoes, cucumbers, red onions, olives, feta cheese, and olive oil, typically seasoned with oregano.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 30,name: 'Funchosa',description: 'Type of translucent Asian noodle made from starch, often served in soups, stir-fries, or salads, and commonly paired with vegetables, meats, or seafood.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 31,name: 'Caprese Salad',description: 'An Italian salad made with fresh mozzarella, tomatoes, basil, olive oil, and balsamic vinegar, offering a light and flavorful combination.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
  {id: 32,name: 'Cobb Salad',description: 'A hearty American salad made with mixed greens, grilled chicken, bacon, hard-boiled eggs, avocado, blue cheese, tomatoes, and a tangy dressing.',category: 4,image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg'},
    {

      id: 33,

      name: 'Lagman',

      time: '1.15 minutes',

      description: 'A flavorful dish with hand-pulled noodles, tender beef, and veggies.',

      category: 5,

      image: 'https://www.koolinar.ru/all_image/article/4/4795/article-a0d51a1c-272b-4f19-83aa-361bbf89c662_large.webp'

    },
    {
      id: 34,
      name: 'Soup',
      time: '50 minutes',
      description: 'A comforting and flavorful dish made with vegetables to meats, simmered in a rich broth',
      category: 5,
      image: 'https://img.pravda.ru/image/preview/article/7/6/3/2276763_amp.jpeg'
    },
    {
      id:35,
      name: 'Lasagna',
      time: '40 minutes',
      description: 'Italian dish featuring layers of pasta, savory meat sauce, creamy béchamel, and melted cheese.',
      category: 5,
      image: 'https://t4.ftcdn.net/jpg/06/30/46/11/360_F_630461149_lUqegHmkRsYJZgpOZfghTwFKusAAcihm.jpg'
    },
    {
     
      id:36,
      name: 'Steak',
      time: '30 minutes',
      description: 'Italian dish featuring layers of pasta, savory meat sauce, creamy béchamel, and melted cheese.',
      category: 5,
      image: 'https://i.pinimg.com/originals/25/17/13/251713425a789302d62fc4e60afb71ca.jpg'
    },
    {
      id:37,
      name: 'Khinkali',
      time: '1.30 minutes',
      description: 'Khinkali are traditional Georgian dumplings filled with seasoned meat and broth, wrapped in thick dough and boiled until tender.',
      category: 5,
      image: 'https://avatars.mds.yandex.net/get-shedevrum/13968038/img_0fad412a7b8111efb0fd0ac508cf5306/orig'
    },
    {
      id: 38,
      name:'Potato Gratin',
      time:'1.30 minutes',
      description:'A dish where thin slices of potatoes are baked in cream with cheese and spices, creating a golden, crispy crust.',
      category: 5,
      image: 'https://cdn.lifehacker.ru/wp-content/uploads/2025/03/107_1741352621.jpg'
    },
    {
      id: 39,
      name: 'Kung Pao Chicken',
      description: 'A spicy stir-fried dish made with chicken, peanuts, vegetables, and chili peppers.',
      time: '20 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 40,
      name: 'Sweet and Sour Pork',
      description: 'Tender pork pieces coated in a tangy and sweet sauce, often served with vegetables.',
      time: '25 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 41,
      name: 'Fried Rice',
      description: 'Stir-fried rice with vegetables, eggs, and a choice of meat such as chicken, pork, or shrimp.',
      time: '15 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 42,
      name: 'Spring Rolls',
      description: 'Crispy fried rolls filled with vegetables, meat, and sometimes shrimp, served with dipping sauce.',
      time: '15 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 43,
      name: 'Mapo Tofu',
      description: 'A spicy Sichuan dish made with tofu and ground pork or beef, cooked in a chili and bean paste sauce.',
      time: '20 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 44,
      name: 'Beef with Broccoli',
      description: 'Tender beef stir-fried with broccoli in a savory brown sauce, often served with rice.',
      time: '20 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 45,
      name: 'Dim Sum',
      description: 'Small steamed or fried dumplings filled with meat, seafood, or vegetables, often served in small portions.',
      time: '25 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    },
    {
      id: 46,
      name: 'Hot and Sour Soup',
      description: 'A flavorful soup made with mushrooms, tofu, bamboo shoots, and a tangy, spicy broth.',
      time: '15 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg'
    }

  ];

  // Справочник категорий
  categories: Category[] = [
    { id: 1, name: 'fast-food', description: 'Quick and tasty' },
    { id: 2, name: 'desserts', description: 'Sweet treats' },
    { id: 3, name: 'drinks', description: 'Refreshing beverages' },
    { id: 4, name: 'salads', description: 'Healthy greens' },
    { id: 5, name: 'main dishes', description: 'Satisfying meals' },
    { id: 6, name: 'chinese cuisine', description: 'Authentic flavors' }
  ];

  constructor(private route: ActivatedRoute) {}

  seeIngredients(id: number) {
    console.log('Посмотреть ингредиенты для ID:', id);
  }

  addToFavorites(id: number) {
    console.log('Добавлено в избранное ID:', id);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // 1. Берем имя из URL (например, "fast-food")
      const nameFromUrl = params['name']?.toLowerCase().trim();
      console.log('Имя из URL:', nameFromUrl);

      // 2. Ищем объект категории в нашем массиве
      const foundCategory = this.categories.find(c => {
        // Сравниваем, убирая лишние пробелы и приводя к нижнему регистру
        return c.name.toLowerCase().replace(/\s/g, '-') === nameFromUrl?.replace(/\s/g, '-');
      });

      if (foundCategory) {
        this.categoryName = foundCategory.name;
        // 3. Фильтруем. Приводим к Number на случай, если в моделях ID — это строка
        this.filteredProducts = this.allProducts.filter(
          p => Number(p.category) === Number(foundCategory.id)
        );
        console.log('Найдена категория:', foundCategory);
        console.log('Найдено продуктов:', this.filteredProducts.length);
      } else {
        this.categoryName = 'Category Not Found';
        this.filteredProducts = [];
        console.warn('Категория не найдена в списке для:', nameFromUrl);
      }
    });
  }
}