import { useState, useEffect } from "react";

export const useMarket = (aisle: 'PRODUCE' | 'PACKAGED', search: string) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        if (aisle === 'PRODUCE') {
          // Fetch raw ingredients
          const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
          const json = await res.json();
          let list = json.meals.map((i: any) => ({
              id: i.idIngredient, name: i.strIngredient, type: 'RAW',
              image: `https://www.themealdb.com/images/ingredients/${i.strIngredient}.png`
          }));
          if(search) list = list.filter((i: any) => i.name.toLowerCase().includes(search.toLowerCase()));
          else list = list.slice(0, 48); // Limit initial view
          setItems(list);
        } else {
          // Fetch packaged snacks
          const term = search || 'snacks';
          const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${term}&search_simple=1&action=process&json=1&page_size=24&sort_by=popularity`);
          const json = await res.json();
          const list = json.products
            .filter((p: any) => p.image_front_url && p.product_name)
            .map((p: any) => ({
              id: p.code, name: p.product_name, brand: p.brands ? p.brands.split(',')[0] : "Generic",
              image: p.image_front_url, calories: p.nutriments?.['energy-kcal_100g'] || 0,
              grade: p.nutriscore_grade ? p.nutriscore_grade.toUpperCase() : "?", type: 'PACKAGED'
            }));
          setItems(list);
        }
      } catch (e) { console.error(e); setItems([]); }
      setLoading(false);
    };

    // Debounce search slightly
    const timeout = setTimeout(fetchItems, 300);
    return () => clearTimeout(timeout);
  }, [aisle, search]);

  return { items, loading };
};