const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

document.addEventListener("DOMContentLoaded", () => {
  loadRestaurants();
});

async function loadRestaurants(){

  const { data, error } = await db
  .from("restaurants")
  .select("id,name");

  if(error){
    console.log(error);
    return;
  }

  const container = document.getElementById("restaurants");
  container.innerHTML = "";

  data.forEach(r => {

    const div = document.createElement("div");
    div.innerText = r.name + " (" + r.id + ")";
    container.appendChild(div);

  });

}

async function createOrder(){

  const restaurant_id =
  document.getElementById("restaurant_id").value;

  const distance =
  parseFloat(document.getElementById("distance").value);

  const payment_mode =
  document.getElementById("payment_mode").value;

  const order_amount = 200;
  const prep_time = 15;

  const { data, error } =
  await db.rpc("create_order",{

    p_restaurant_id: restaurant_id,
    p_payment_mode: payment_mode,
    p_order_amount: order_amount,
    p_distance_km: distance,
    p_prep_time: prep_time

  });

  if(error){
    console.log(error);
    alert("Order failed");
    return;
  }

  alert("Order created: " + data);

}
