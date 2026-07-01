import { useMemo, useState } from 'react';
import { doctors, specialties } from '../data/doctors';
import SectionHeading from '../components/SectionHeading';
import SpecialtyChip from '../components/SpecialtyChip';
import DoctorCard from '../components/DoctorCard';

export default function Doctors() {
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [query, setQuery] = useState('');

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = activeSpecialty === 'All' || doctor.specialty === activeSpecialty;
      const matchesQuery = doctor.name.toLowerCase().includes(query.toLowerCase()) || doctor.specialty.toLowerCase().includes(query.toLowerCase());
      return matchesSpecialty && matchesQuery;
    });
  }, [activeSpecialty, query]);

  return (
    <section className="container page-block">
      <SectionHeading
        eyebrow="All doctors"
        title="Find your doctor"
        description="Search and filter the catalog by specialty or name."
      />
      <div className="toolbar">
        <input
          className="search-input"
          type="search"
          placeholder="Search doctors or specialties"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="specialty-filter-row">
          <SpecialtyChip label="All" active={activeSpecialty === 'All'} onClick={() => setActiveSpecialty('All')} />
          {specialties.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} active={activeSpecialty === specialty} onClick={() => setActiveSpecialty(specialty)} />
          ))}
        </div>
      </div>
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}
