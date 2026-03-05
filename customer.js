const loginBtn = document.querySelector("#login button");

loginBtn.onclick = async () => {

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error(error);
    alert("Login failed");
    return;
  }

  console.log("Login success");

  loadRestaurants();

};

async function loadRestaurants(){

  const { data, error } = await supabase
    .from("restaurants")
    .select("*");

  if(error){
    console.error(error);
    return;
  }

  const container = document.getElementById("restaurants");
  container.innerHTML = "";

  data.forEach(r => {

    const div = document.createElement("div");
    div.innerHTML = r.name + " (" + r.id + ")";

    container.appendChild(div);

  });

}

async function createOrder(){

  const restaurant_id = document.getElementById("restaurant_id").value;
  const distance = document.getElementById("distance").value;
  const payment_mode = document.getElementById("payment_mode").value;

  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("orders")
    .insert({
      customer_user_id: userData.user.id,
      restaurant_id: restaurant_id,
      distance_km: distance,
      payment_mode: payment_mode
    });

  if(error){
    console.error(error);
    alert("Order failed");
    return;
  }

  alert("Order created");

}
