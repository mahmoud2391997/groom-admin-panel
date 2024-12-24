import PropTypes from 'prop-types';

const ProviderServiceCard = ({
  serviceName,
  description,
  address,
  servicePrice,
  serviceDeposit,
  maximumBookingPerDay,
  workingHours,
  appointmentDuration,
  bufferTime,
  cancellationPolicy,
  serviceImage,
  serviceType,
}) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        src={serviceImage}
        alt={serviceName}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">{serviceName}</h2>
        <p className="text-gray-600 mt-2">{description}</p>

        <div className="mt-4">
          <p className="font-medium text-gray-700">
            Service Type: <span className="text-blue-500">{serviceType}</span>
          </p>
          <p className="font-medium text-gray-700">Location: {address}</p>
          <p className="font-medium text-gray-700">Price: ₹{servicePrice}</p>
          <p className="font-medium text-gray-700">
            Service Deposit: ₹{serviceDeposit}
          </p>
          <p className="font-medium text-gray-700">
            Max Bookings per Day: {maximumBookingPerDay}
          </p>
          <p className="font-medium text-gray-700">
            Working Hours: {workingHours} hours
          </p>
          <p className="font-medium text-gray-700">
            Appointment Duration: {appointmentDuration} minutes
          </p>
          <p className="font-medium text-gray-700">
            Buffer Time: {bufferTime} minutes
          </p>

          <div className="mt-4">
            <p className="text-gray-700">Cancellation Policy:</p>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: cancellationPolicy }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-100 text-right">
        <button className="text-white bg-blue-500 px-4 py-2 rounded-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

ProviderServiceCard.propTypes = {
  serviceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  servicePrice: PropTypes.number.isRequired,
  serviceDeposit: PropTypes.number.isRequired,
  maximumBookingPerDay: PropTypes.number.isRequired,
  workingHours: PropTypes.array.isRequired,
  appointmentDuration: PropTypes.number.isRequired,
  bufferTime: PropTypes.number.isRequired,
  cancellationPolicy: PropTypes.string.isRequired,
  serviceImage: PropTypes.string.isRequired,
  serviceType: PropTypes.string.isRequired,
};

export default ProviderServiceCard;
