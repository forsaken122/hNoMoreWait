package com.pb.nomorewait;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.pb.nomorewait");

        noClasses()
            .that()
                .resideInAnyPackage("com.pb.nomorewait.service..")
            .or()
                .resideInAnyPackage("com.pb.nomorewait.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.pb.nomorewait.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
