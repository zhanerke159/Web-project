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
  {id: 1,name: 'Double Cheeseburger',description: 'Classic burger with double cheese',time: '20 minutes',category: 1,image: 'https://cw33.com/wp-content/uploads/sites/8/2022/09/GettyImages-1356363431.jpg?w=1280'},
  {id: 2,name: 'Pepperoni Pizza',description: 'Hot and spicy pizza.',time: '25 minutes',category: 1,image: 'https://thecoconutmama.com/wp-content/uploads/2024/04/shutterstock_2081936983-scaled.jpg'},
  {id: 3,name: 'Chicken Wrap',description: 'Grilled chicken wrapped with fresh vegetables and creamy sauce in a soft tortilla.',time: '10 minutes',category: 1,image: 'https://thumbs.dreamstime.com/b/freshly-cooked-chicken-shawarma-wrap-pickles-sauces-freshly-cooked-chicken-shawarma-wrap-pickles-sauces-275916381.jpg'},
  {id: 4,name: 'Nuggets',time: '15 minutes',description: 'Yummy food which is ready in 15 minutes.',category: 1,image: 'https://avatars.mds.yandex.net/i?id=871bb4c05a9b3e1a20f8b92c680fefae_l-5419733-images-thumbs&n=13'},
  {id: 5,name: 'French fries',description: 'Really crispy from the outside and soft from the inside French fries.',time: '20 minutes',category: 1,image: 'https://i.pinimg.com/736x/73/7e/d9/737ed93987aae98a76fc2e5f12fc0ecc.jpg'},
  {id: 6,name: 'Onigiri',description: 'Soft rice pyramids with the filling inside.',time: '18 minutes',category: 1,image: 'https://media.istockphoto.com/id/1136729082/tr/fotoğraf/japon-yemekleri-ızgara-pirinç-topu-yakionigiri.jpg?s=612x612&w=0&k=20&c=C7cVUxema1vJtX0PlkHJ-NXvQ4uPuX0s--1zrfG9cVs='},
  {id: 7,name: 'Cheese Quesadilla',description: 'A crispy tortilla filled with melted cheese, perfect for a quick snack.',time: '5 minutes',category: 1,image: 'https://c8.alamy.com/comp/2C76JF5/homemade-vegetarian-quesadilla-with-cheese-beans-and-pico-2C76JF5.jpg'},
  {id: 8,name: 'Fish Tacos',description: 'Lightly battered fish fillets with cabbage slaw and a tangy sauce in soft tacos.',time: '15 minutes',category: 1,image: 'https://i.pinimg.com/originals/85/4b/41/854b41fb6ca51ba801c290079247d75c.jpg?nii=t'},
  {id: 9,name: 'Chocolate Cake',description: 'Sweet chocolate dessert',time: '50 minutes',category: 2,image: 'https://www.eatclub.de/wp-content/uploads/2022/12/torte-richtig-anschneiden-1024x576.jpg'},
  {id: 10,name: 'Napoleon',description: 'Cake with thin biscuit layers and smooth cream between each layer.',time: '1 hour',category: 2,image: 'https://avatars.mds.yandex.net/get-shedevrum/15170076/img_804d6367f3aa11ef9049ce140e702b49/orig'},
  {id: 11,name: 'Russian kulich',description: 'Soft biscuit with sweet filling for your taste.',time: '45 minutes',category: 2,image: 'https://avatars.mds.yandex.net/i?id=8496b2395e4df9f74ab5d288a8f7c423_l-10592644-images-thumbs&n=13'},
  {id: 12,name: 'Macaroons',description: 'Crispy meringue with thick and delicate cream and the filling inside of whatever taste you like',time: '50 minutes',category: 2,image: 'https://i.pinimg.com/736x/25/04/de/2504de4febb005f1d9e27d0fb98bd770.jpg'},
  {id: 13,name: 'Donuts',description: 'Fluffy sweet dough coated in a chocolate',time: '30 minutes',category: 2,image: 'https://media.istockphoto.com/id/2191474401/tr/fotoğraf/tasty-assorted-donuts.jpg?s=170667a&w=0&k=20&c=OclCvMSladT2oH7DLr8eEbcEQnEymasTd36bCPMzrKI='},
  {id: 14,name: 'Cookies',description: 'Crispy cookies with rich amount of chocolate in it.',time: '35 minutes',category: 2,image: 'https://avatars.mds.yandex.net/i?id=c927c27e18df2cf9252fe63d3355af45_l-5413570-images-thumbs&n=13'},
  {id: 15,name: 'Merringue roulette',description: 'A bit crispy and delicate layer of merringue, with light and sweet cream inside.',time: '30 minutes',category: 2,image: 'https://i.pinimg.com/originals/6a/ad/4c/6aad4c77d44bafd2d226d3de9ab79a05.jpg'},
  {id: 16,name: 'Ice cream',description: 'Thick and delicate cold dessert with differernt tastes.',time: '20 minutes',category: 2,image: 'https://avatars.mds.yandex.net/i?id=519607bdda07a734db4339601eff17fd_l-4079997-images-thumbs&n=13'},
  {id: 17,name: 'Iced coffee',description: 'Cold and refreshing coffee with ice cubes.',time: '10 minutes',category: 3,image: 'https://www.tastingtable.com/img/gallery/incorporate-bourbon-into-your-cold-foam-for-a-boozy-iced-coffee/l-intro-1717439952.jpg'},
  {id: 18,name: 'Smoothie',description: 'A blended drink made from fruit, yogurt or milk, and sometimes vegetables, creating a creamy, nutritious beverage.',time: '8 minutes',category: 3,image: 'https://png.pngtree.com/thumb_back/fh260/background/20231018/pngtree-tempting-glass-of-cherry-smoothie-and-fresh-ingredients-on-a-rustic-image_13629848.png'},
  {id: 19,name: 'Milkshake',description: 'A thick and creamy drink made with milk, ice cream, and flavorings like chocolate or vanilla.',time: '10 minutes',category: 3,image: 'https://avatars.mds.yandex.net/i?id=98d11be108de54ccf1ceaf0e713807a3_l-16999685-images-thumbs&n=13'},
  {id: 20,name: 'Marroccan tea',description: 'Sweet tea made by steeping green tea with fresh mint leaves and sweetened with sugar.',time: '5 minutes',category: 3,image: 'https://avatars.mds.yandex.net/i?id=dcb8d96c18f1dc89c52fa2c28aa6a0f1_l-10613167-images-thumbs&n=13'},
  {id: 21,name: 'Bubble tea',description: 'Red colored sweet tea having gunpowder, mint and sugar.',time: '20 minutes',category: 3,image: 'https://avatars.mds.yandex.net/i?id=dc2b633f8b97f67de78911d8c6a3f68b_l-4613979-images-thumbs&n=13'},
  {id: 22,name: 'Lemonade',description: 'A sweet and tart drink made from lemon juice, water, and sugar, often served chilled.',time: '6 minutes',category: 3,image: 'https://media.istockphoto.com/id/1479321833/ru/фото/освежающий-коктейль-мохито-с-лаймом-кубиками-льда-и-зелеными-листьями-мяты-на-черном-фоне.jpg?s=612x612&w=0&k=20&c=g21SbbZS9GVihsg_BeRKLhWMxGrT34Xk_9nxGFuvWao='},
  {id: 23,name: 'Mojito',description: 'A refreshing cocktail made with rum, mint, lime, sugar, and soda water, perfect for hot weather.',time: '9 minutes',category: 3,image: 'https://avatars.mds.yandex.net/i?id=ac44fe343530e5b836060591d8ed6c1c_l-5296622-images-thumbs&n=13'},
  {id: 24,name: 'Margarita',description: 'A classic cocktail made with tequila, lime juice, and orange liqueur, served with a salted rim.',time: '10 minutes',category: 3,image: 'https://media.istockphoto.com/id/1318616344/ru/фото/классический-коктейль-маргарита-с-соком-лайма-и-кубиком-льда-на-черном-фоне-с-всплеском.jpg?s=612x612&w=0&k=20&c=1AEaXmnCPxGGHTxd-nMxSZQxs9Udpl4jlsxgvJ0JzhM='},
  {id: 25,name: 'Caesar',description: 'A classic salad made with romaine lettuce, croutons, parmesan cheese, and Caesar dressing, often topped with grilled chicken or bacon',time: '15 minutes',category: 4,image: 'https://static.toprecepty.cz/fotky/clanky_hlavni/healthy-couture-salad-with-grilled-chicken-fillet-generated-by-ai-860-484-wide.jpg'},
  {id: 26,name: 'Tabbouleh',description: 'A refreshing Middle Eastern salad made with parsley, bulgur wheat, tomatoes, cucumbers, mint, and dressed with olive oil, lemon juice, and salt.',time: '20 minutes',category: 4,image: 'https://avatars.mds.yandex.net/i?id=a844929061487c318e987477d4429ca0_l-4886334-images-thumbs&n=13'},
  {id: 27,name: 'Pasta Salad',description: 'A versatile salad made with cooked pasta, often mixed with vegetables, cheese, and a tangy dressing, commonly served chilled.',time: '17 minutes',category: 4,image: 'https://png.pngtree.com/background/20230427/original/pngtree-an-attractive-dinner-plate-containing-pasta-salad-picture-image_2495862.jpg'},
  {id: 28,name: 'Nicoise Salad',description: 'A French salad featuring tuna, hard-boiled eggs, green beans, potatoes, olives, tomatoes, and anchovies, typically served with a vinaigrette dressing.',time: '20 minutes',category: 4,image: 'https://avatars.mds.yandex.net/i?id=926e70d37c66dc917aed28106eef04ee_l-5229055-images-thumbs&n=13'},
  {id: 29,name: 'Greek salad',description: 'Fresh dish made with tomatoes, cucumbers, red onions, olives, feta cheese, and olive oil, typically seasoned with oregano.',time: '10 minutes',category: 4,image: 'https://img.freepik.com/free-photo/vegetable-salad-with-white-cheese_140725-4329.jpg?semt=ais_hybrid&w=740&q=80'},
  {id: 30,name: 'Funchosa',description: 'Type of translucent Asian noodle made from starch, often served in soups, stir-fries, or salads, and commonly paired with vegetables, meats, or seafood.',time: '30 minutes',category: 4,image: 'https://images.news.ru/photo/30b3f1da-0a26-11f0-b3e7-ac1f6bad3ff4_930.jpg'},
  {id: 31,name: 'Caprese Salad',description: 'An Italian salad made with fresh mozzarella, tomatoes, basil, olive oil, and balsamic vinegar, offering a light and flavorful combination.',time: '15 minutes',category: 4,image: 'https://www.koolinar.ru/all_image/article/4/4961/article-08e9f5a8-35f5-49cd-b8ef-04e8b7812d0b_large.png'},
  {id: 32,name: 'Cobb Salad',description: 'A hearty American salad made with mixed greens, grilled chicken, bacon, hard-boiled eggs, avocado, blue cheese, tomatoes, and a tangy dressing.',time: '20 minutes',category: 4,image: 'https://thumbs.dreamstime.com/b/здоровый-салат-кобб-с-сыром-и-яйца-помидоры-бекона-авокадо-курицу-182177379.jpg'},
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
      image: 'https://t3.ftcdn.net/jpg/09/74/62/10/360_F_974621093_G7t2sIyMMUtcnmw7uWaJ19u4D6BqYWiv.jpg'
    },
    {
      id: 40,
      name: 'Sweet and Sour Pork',
      description: 'Tender pork pieces coated in a tangy and sweet sauce, often served with vegetables.',
      time: '25 minutes',
      category: 6,
      image: 'https://avatars.mds.yandex.net/i?id=174f3974e5625ee88ff8c9c5a6e16026_l-5642274-images-thumbs&n=13'
    },
    {
      id: 41,
      name: 'Fried Rice',
      description: 'Stir-fried rice with vegetables, eggs, and a choice of meat such as chicken, pork, or shrimp.',
      time: '15 minutes',
      category: 6,
      image: 'https://i.pinimg.com/originals/e8/c9/a6/e8c9a639d647d7088a8b67e7824a2286.jpg'
    },
    {
      id: 42,
      name: 'Spring Rolls',
      description: 'Crispy fried rolls filled with vegetables, meat, and sometimes shrimp, served with dipping sauce.',
      time: '15 minutes',
      category: 6,
      image: 'https://avatars.mds.yandex.net/i?id=858ef65b864ef2415dbff798edb9eab8_l-7085252-images-thumbs&n=13'
    },
    {
      id: 43,
      name: 'Mapo Tofu',
      description: 'A spicy Sichuan dish made with tofu and ground pork or beef, cooked in a chili and bean paste sauce.',
      time: '25 minutes',
      category: 6,
      image: 'https://avatars.mds.yandex.net/i?id=08c4e37e00988907c47e08179b8b1f99_l-11931769-images-thumbs&n=13'
    },
    {
      id: 44,
      name: 'Beef with Broccoli',
      description: 'Tender beef stir-fried with broccoli in a savory brown sauce, often served with rice.',
      time: '20 minutes',
      category: 6,
      image: 'https://i.pinimg.com/736x/0a/dc/b0/0adcb00d23fa42c066462e9a2bbade9e.jpg'
    },
    {
      id: 45,
      name: 'Dim Sum',
      description: 'Small steamed or fried dumplings filled with meat, seafood, or vegetables, often served in small portions.',
      time: '45 minutes',
      category: 6,
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*fwU6ttBu4UgNQgD9x8xYJQ.jpeg'
    },
    {
      id: 46,
      name: 'Hot and Sour Soup',
      description: 'A flavorful soup made with mushrooms, tofu, bamboo shoots, and a tangy, spicy broth.',
      time: '40 minutes',
      category: 6,
      image: 'https://i.pinimg.com/originals/93/f6/d4/93f6d48dcf78af3bbef99176892acf5d.png?nii=t'
    },
    {
      id: 47,
      name:'Spaghetti Carbonara',
      time:'30 minutes',
      description:'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
      category: 5,
      image: 'https://avatars.mds.yandex.net/i?id=d3b4ef24e486bb203b84772ccd6e88ec_l-12727346-images-thumbs&n=13'
    },
    {
      id: 47,
      name:'Beef Stroganoff',
      time:'45 minutes',
      description:'A creamy and savory dish made with tender beef, onions, and mushrooms, served with noodles.',
      category: 5,
      image: 'https://www.koolinar.ru/all_image/article/3/3842/article-83cde552-8b7b-4ee2-b364-8fc9002ee56a_large.jpg'
    },

  ];

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