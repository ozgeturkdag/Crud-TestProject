import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const users = [
  { name: "Mehmet", email: "mehmet43@gmail.com" },
  { name: "Ayşe", email: "aysche43@gmail.com" },
  { name: "Ali", email: "alisd@gmail.com" },
  { name: "Deneme", email: "mehm1et43@gmail.com" },
  { name: "Test", email: "aysch2443@gmail.com" },
  { name: "Mahmut", email: "ali123sd@gmail.com" },
];

test("her kullanıcı için ekrana bir tablo satırı basar", () => {
  // prop olarak değer alan bir bileşeni ekrana basma
  render(<UserList users={users} />);

  // users tablosu içerisindeki bütün satırları al
  // within > bir kapsayıcı içerisindeki çocuk elemanları çağırmaya yarar
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // kullanıcı sayısı kadar satır olduğunu doğrula
  expect(rows).toHaveLength(users.length);
});

test("her bir kullanıcı için isim ve email değeri ekranda gözükür", () => {
  render(<UserList users={users} />);

  // herbir kullanıcı için ekrandaki
  // tablo hücrelerinde isim ve mail değerleri yazıyormu
  for (const user of users) {
    // kullanıcnın adını içerern tablo hücresiini al
    const nameCell = screen.getByText(user.name);

    // kullanıcnın emailini içerern tablo hücresini al
    const mailCell = screen.getByText(user.email);

    // beklenen sonuçları kontrol et
    expect(nameCell).toBeInTheDocument();
    expect(mailCell).toBeInTheDocument();
  }
});
