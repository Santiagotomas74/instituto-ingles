"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Search,
  FileText,
  Video,
  ExternalLink,
  Image as ImageIcon,
  BookOpen,
  Headphones,
  Presentation,
  File,
  Dumbbell,
  X,
} from "lucide-react";

interface Props {
  classroomId: string;
}

interface Material {
  id: string;
  titulo: string;
  descripcion: string | null;

  tipo: "file" | "video" | "link" | "text";

  material_category: string | null;
  sub_category: string | null;

  contenido_texto: string | null;

  url: string | null;

  archivo_url: string | null;
  archivo_nombre: string | null;
  archivo_size: number | null;

  created_at: string;

  created_by_name: string | null;
}

/*
=====================================================
CONFIGURACIÓN DE SUBCATEGORÍAS
=====================================================
*/

const subCategories = [
  {
    id: "all",
    translationKey: "materials.subcategories.all",
    icon: FileText,
  },
  {
    id: "libro",
    translationKey: "materials.subcategories.book",
    icon: BookOpen,
  },
  {
    id: "documento",
    translationKey: "materials.subcategories.document",
    icon: FileText,
  },
  {
    id: "video",
    translationKey: "materials.subcategories.video",
    icon: Video,
  },
  {
    id: "imagen",
    translationKey: "materials.subcategories.image",
    icon: ImageIcon,
  },
  {
    id: "audio",
    translationKey: "materials.subcategories.audio",
    icon: Headphones,
  },
  {
    id: "presentacion",
    translationKey: "materials.subcategories.presentation",
    icon: Presentation,
  },
  {
    id: "ejercicio",
    translationKey: "materials.subcategories.exercise",
    icon: Dumbbell,
  },
  {
    id: "guia",
    translationKey: "materials.subcategories.guide",
    icon: File,
  },
  {
    id: "quiz",
    translationKey: "materials.subcategories.quiz",
    icon: FileText,
  },
  {
    id: "texto",
    translationKey: "materials.subcategories.text",
    icon: FileText,
  },
];

/*
=====================================================
CATEGORÍAS ACADÉMICAS
=====================================================
*/

const academicCategories = [
  {
    id: "all",
    translationKey: "materials.academic_categories.all",
  },
  {
    id: "grammar",
    translationKey: "materials.academic_categories.grammar",
  },
  {
    id: "vocabulary",
    translationKey: "materials.academic_categories.vocabulary",
  },
  {
    id: "reading",
    translationKey: "materials.academic_categories.reading",
  },
  {
    id: "listening",
    translationKey: "materials.academic_categories.listening",
  },
  {
    id: "speaking",
    translationKey: "materials.academic_categories.speaking",
  },
  {
    id: "writing",
    translationKey: "materials.academic_categories.writing",
  },
  {
    id: "homework",
    translationKey: "materials.academic_categories.homework",
  },
  {
    id: "exam",
    translationKey: "materials.academic_categories.exam",
  },
];

/*
=====================================================
ESTILOS POR SUBCATEGORÍA
=====================================================
*/

const subCategoryStyles: Record<
  string,
  {
    bg: string;
    text: string;
    badge: string;
  }
> = {
  libro: {
    bg: "bg-red-100",
    text: "text-red-600",
    badge: "bg-red-50 text-red-700",
  },

  documento: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    badge: "bg-orange-50 text-orange-700",
  },

  video: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
  },

  imagen: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    badge: "bg-purple-50 text-purple-700",
  },

  audio: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    badge: "bg-pink-50 text-pink-700",
  },

  presentacion: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },

  ejercicio: {
    bg: "bg-green-100",
    text: "text-green-600",
    badge: "bg-green-50 text-green-700",
  },

  guia: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    badge: "bg-cyan-50 text-cyan-700",
  },

  quiz: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700",
  },

  texto: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    badge: "bg-slate-50 text-slate-700",
  },
};

/*
=====================================================
COMPONENT
=====================================================
*/

export default function Materials({ classroomId }: Props) {
  const { t, i18n } = useTranslation();

  const [materials, setMaterials] = useState<Material[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const [selectedCategory, setSelectedCategory] = useState("all");

  /*
  =====================================================
  OBTENER MATERIALES
  =====================================================
  */

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/student/classroom/${classroomId}/materials`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Error cargando materiales");
        }

        const data = await res.json();

        if (data.success) {
          setMaterials(data.materials ?? []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (classroomId) {
      fetchMaterials();
    }
  }, [classroomId]);

  /*
  =====================================================
  FILTRADO
  =====================================================
  */

  const filteredMaterials = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return materials.filter((material) => {
      const matchesSearch =
        !normalizedSearch ||
        material.titulo.toLowerCase().includes(normalizedSearch) ||
        material.descripcion?.toLowerCase().includes(normalizedSearch) ||
        material.created_by_name?.toLowerCase().includes(normalizedSearch);

      const matchesSubCategory =
        selectedSubCategory === "all" ||
        material.sub_category === selectedSubCategory;

      const matchesCategory =
        selectedCategory === "all" ||
        material.material_category === selectedCategory;

      return matchesSearch && matchesSubCategory && matchesCategory;
    });
  }, [materials, search, selectedSubCategory, selectedCategory]);

  /*
  =====================================================
  OBTENER CONFIGURACIÓN DE SUBCATEGORÍA
  =====================================================
  */

  const getSubCategoryConfig = (subCategory: string | null) => {
    const config = subCategories.find((item) => item.id === subCategory);

    return (
      config || {
        id: "default",
        translationKey: "",
        icon: FileText,
      }
    );
  };

  /*
  =====================================================
  OBTENER ESTILO
  =====================================================
  */

  const getStyle = (subCategory: string | null) => {
    return (
      subCategoryStyles[subCategory || ""] || {
        bg: "bg-slate-100",
        text: "text-slate-600",
        badge: "bg-slate-50 text-slate-700",
      }
    );
  };

  /*
  =====================================================
  OBTENER LINK
  =====================================================
  */

  const getMaterialHref = (material: Material) => {
    if (material.tipo === "link") {
      return material.url || "#";
    }

    return material.archivo_url || material.url || "#";
  };

  /*
  =====================================================
  FORMATEAR FECHA
  =====================================================
  */

  const formatDate = (date: string) => {
    const locale = i18n.language === "en" ? "en-US" : "es-AR";

    return new Date(date).toLocaleDateString(locale);
  };

  /*
  =====================================================
  CARD
  =====================================================
  */

  const MaterialCard = ({ material }: { material: Material }) => {
    const config = getSubCategoryConfig(material.sub_category);

    const style = getStyle(material.sub_category);

    const Icon = config.icon;

    return (
      <a
        href={getMaterialHref(material)}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          bg-white
          rounded-2xl
          border
          border-slate-200
          p-5
          shadow-sm
          hover:shadow-lg
          hover:-translate-y-1
          transition-all
          flex
          flex-col
          justify-between
          min-h-[210px]
        "
      >
        <div>
          {/* HEADER */}

          <div className="flex items-start justify-between gap-4">
            <div
              className={`
                w-12
                h-12
                rounded-xl
                ${style.bg}
                ${style.text}
                flex
                items-center
                justify-center
                shrink-0
              `}
            >
              <Icon size={22} />
            </div>

            <ExternalLink
              size={18}
              className="
                text-slate-300
                group-hover:text-cyan-600
                transition
              "
            />
          </div>

          {/* TITULO */}

          <h3
            className="
              mt-4
              font-bold
              text-lg
              text-slate-900
              group-hover:text-cyan-600
              transition
              line-clamp-2
            "
          >
            {material.titulo}
          </h3>

          {/* DESCRIPCION */}

          {material.descripcion && (
            <p
              className="
                mt-2
                text-sm
                text-slate-500
                line-clamp-2
              "
            >
              {material.descripcion}
            </p>
          )}
        </div>

        {/* FOOTER */}

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {material.sub_category && (
              <span
                className={`
                  px-2.5
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${style.badge}
                `}
              >
                {config.translationKey
                  ? t(config.translationKey)
                  : material.sub_category}
              </span>
            )}

            {material.material_category && (
              <span
                className="
                  px-2.5
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  bg-slate-100
                  text-slate-600
                "
              >
                {t(
                  `materials.academic_categories.${material.material_category}`,
                  material.material_category,
                )}
              </span>
            )}
          </div>

          <div
            className="
              mt-3
              flex
              justify-between
              items-center
              text-xs
              text-slate-400
            "
          >
            <span>
              {material.created_by_name || t("materials.default_creator")}
            </span>

            <span>{formatDate(material.created_at)}</span>
          </div>
        </div>
      </a>
    );
  };

  /*
  =====================================================
  LOADING
  =====================================================
  */

  if (loading) {
    return (
      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-slate-200
          shadow-sm
          p-16
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div className="relative">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-cyan-200
              border-t-cyan-600
              animate-spin
            "
          />

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-white
              flex
              items-center
              justify-center
              p-2
            "
          >
            <img
              src="/logo2.png"
              alt="Instituto"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        <h2 className="mt-8 text-2xl font-bold text-slate-900">
          {t("materials.loading_title")}
        </h2>

        <p className="mt-3 text-slate-500">{t("materials.loading_subtitle")}</p>
      </div>
    );
  }

  /*
  =====================================================
  RENDER
  =====================================================
  */

  return (
    <div className="space-y-6">
      {/* =================================================
          BUSCADOR
      ================================================= */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-5
          shadow-sm
        "
      >
        <div
          className="
            relative
            flex
            items-center
          "
        >
          <Search
            size={20}
            className="
              absolute
              left-4
              text-slate-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("materials.search_placeholder")}
            className="
              w-full
              h-12
              pl-12
              pr-12
              rounded-2xl
              border
              border-slate-200
              outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-100
              text-slate-700
            "
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="
                absolute
                right-4
                text-slate-400
                hover:text-slate-700
              "
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* =================================================
          FILTRO POR TIPO
      ================================================= */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-5
          shadow-sm
        "
      >
        <p
          className="
            text-xs
            uppercase
            tracking-wider
            font-semibold
            text-slate-400
            mb-3
          "
        >
          {t("materials.material_type")}
        </p>

        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-1
          "
        >
          {subCategories.map((category) => {
            const Icon = category.icon;

            const active = selectedSubCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedSubCategory(category.id)}
                className={`
                  shrink-0
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  ${
                    active
                      ? "bg-slate-900 text-white shadow"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <Icon size={16} />

                {t(category.translationKey)}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================
          FILTRO ACADÉMICO
      ================================================= */}

      <div
        className="
          flex
          gap-2
          overflow-x-auto
          pb-1
        "
      >
        {academicCategories.map((category) => {
          const active = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`
                shrink-0
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                transition
                ${
                  active
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-cyan-300"
                }
              `}
            >
              {t(category.translationKey)}
            </button>
          );
        })}
      </div>

      {/* =================================================
          RESULTADOS
      ================================================= */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {t("materials.title")}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {t(
              filteredMaterials.length === 1
                ? "materials.found_one"
                : "materials.found_other",
              {
                count: filteredMaterials.length,
              },
            )}
          </p>
        </div>
      </div>

      {/* =================================================
          GRID
      ================================================= */}

      {filteredMaterials.length === 0 ? (
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-12
            text-center
          "
        >
          <FileText
            size={42}
            className="
              mx-auto
              text-slate-300
              mb-4
            "
          />

          <h3
            className="
              font-semibold
              text-lg
              text-slate-700
            "
          >
            {t("materials.no_materials_title")}
          </h3>

          <p
            className="
              text-sm
              text-slate-400
              mt-1
            "
          >
            {t("materials.no_materials_desc")}
          </p>

          {(search ||
            selectedSubCategory !== "all" ||
            selectedCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedSubCategory("all");
                setSelectedCategory("all");
              }}
              className="
                mt-5
                px-5
                py-2.5
                rounded-xl
                bg-cyan-600
                text-white
                text-sm
                font-medium
                hover:bg-cyan-500
                transition
              "
            >
              {t("materials.clear_filters")}
            </button>
          )}
        </div>
      ) : (
        <div
          className="
            grid
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-5
          "
        >
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
}
