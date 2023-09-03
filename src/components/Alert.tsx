import { FiAlertCircle } from 'react-icons/fi';

export const Alert = () => {
  return (
    <div
      className="
      flex
      items-center
      justify-start
      gap-x-7
    "
    >
      <FiAlertCircle size={32} color="#F25D27" />

      <p
        className="
      text-gray-500
        text-sm
      "
      >
        Preencha todos os <br />
        dados com cuidado.
      </p>
    </div>
  );
};
