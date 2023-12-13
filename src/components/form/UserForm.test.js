import { render, screen, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import user from "@testing-library/user-event";

// userForm bileşenin diğer bielşenlerden izole bir şekilde test edicez
// form gönderilince tabloya eleman ekleiyo mu kontrolü yapmıycaz
//! formun mantığı doğru şekilde çalışıyor
// name ve email inputlatlarını doldurdaktan sonra
// formu gönderinde addUser fonksiyonu çalışyor mu?
// addUser fonksiyonuna doğru parametre gönderiliyor mu?

test("form gönderilince kullanıcı fonksiyonu doğru paramtreleri alarak çalışır", () => {
  // mock > addUser fonksiyonunu taklit edicek
  // ve ne zman çağrıldı | hangi parametrelerele çağrıldı
  // tarzında testleri yapmamızı sağlıyacak bir test fonksiyonu
  const mock = jest.fn();

  render(<UserForm addUser={mock} />);

  // gerekli elemanları alma
  const nameInput = screen.getByLabelText("Name");
  const mailInput = screen.getByLabelText("Email");
  const submitBtn = screen.getByRole("button");

  // name inputunu doldur - yol 1
  user.click(nameInput);
  user.keyboard("bilal");

  // email inputunu doldur - yol 2
  user.type(mailInput, "bilal@gmail.com");

  // formu gönderir
  user.click(submitBtn);

  // form gönderilince addUser methodu çağrılıyor mu ?
  expect(mock).toBeCalled();

  // addUser çağrılırken doğru parametreler gönderiliyor mu?
  expect(mock).toBeCalledWith({
    name: "bilal",
    email: "bilal@gmail.com",
  });
});

test("form gönderildikten sonra inputlar temizleniyor mu?", async () => {
  render(<UserForm addUser={() => {}} />);

  // gerekli elemanları alma
  const nameInp = screen.getByLabelText("Name");
  const mailInp = screen.getByLabelText("Email");
  const button = screen.getByRole("button");

  // inputları doldurma
  user.type(nameInp, "mahmut");
  user.type(mailInp, "mahmut@mail.com");

  // inputlara yazılan yazı value olarak eklendimi
  expect(nameInp).toHaveValue("mahmut");
  expect(mailInp).toHaveValue("mahmut@mail.com");

  // formu gönderme
  user.click(button);

  // name inputu boş mu?
  // state değişikliği direkt olarak gerçekleşmediği için
  // waitfor ile gerçekleşmesini bekledik
  await waitFor(() => expect(nameInp).toHaveValue(""));
  await waitFor(() => expect(mailInp.value).toBe(""));
});
