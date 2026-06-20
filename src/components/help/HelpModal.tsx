interface Props {
  onClose: () => void
}

export const HelpModal = ({
  onClose
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-[1000] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[700px] max-h-[80vh] overflow-auto text-left">
        <h2 className="text-2xl font-semibold mb-4">
          Справка
        </h2>

        <div className="space-y-4 text-sm">
          <section>
            <h3 className="font-semibold mb-1">
              Работа с таблицей
            </h3>

            <ul className="list-disc ml-5">
              <li>
                Создавайте задачи и указывайте плановые часы.
              </li>

              <li>
                Заполняйте фактические часы по дням.
              </li>

              <li>
                Итоги рассчитываются автоматически.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              Навигация
            </h3>

            <ul className="list-disc ml-5">
              <li>
                Используйте стрелки ← → ↑ ↓ для перехода между ячейками.
              </li>

              <li>
                Недели можно сворачивать и разворачивать.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              Работа с днями
            </h3>

            <ul className="list-disc ml-5">
              <li>
                Наведите курсор на день для просмотра подробной информации.
              </li>

              <li>
                Дважды нажмите на день для изменения времени начала работы и отметки обеда.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              Настройки
            </h3>

            <ul className="list-disc ml-5">
              <li>ФИО сотрудника.</li>
              <li>Время начала рабочего дня.</li>
              <li>Количество рабочих часов.</li>
              <li>Длительность обеда.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              Экспорт
            </h3>

            <ul className="list-disc ml-5">
              <li>
                Отчёт можно экспортировать в DOCX.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-1">
              Хранение данных
            </h3>

            <ul className="list-disc ml-5">
              <li>
                Все данные сохраняются локально в браузере.
              </li>

              <li>
                Никакие данные не отправляются на сервер.
              </li>
            </ul>
          </section>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}